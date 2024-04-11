import { ChangeEvent, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Widget from "../components/widget";
import { widgetList } from "../const-data";
import styled from "@emotion/styled";
import { WidgetsPropsType } from "../types";

const WidgetBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 100px;
    justify-content: center;
`

export const ElementsStyles = `
    color: white;
    background-color: rgb(155, 89, 163);
    min-width: 64px;
    padding: 3px 16px;
    font-size: 1rem;
    height: 30px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px;
`

export const Select = styled.select`
    ${ElementsStyles}
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
`

export const Button = styled.button`
    ${ElementsStyles}
    cursor: pointer;
    display: block;
    margin: 0 auto;
    border: none;
    border-radius: 30px;
    margin-top: 20px;
`

export type WidgetComponent = {
    name: string;
    props: WidgetsPropsType;
}

const initialWidgetData: { drop: number, data: WidgetComponent[] }[] = Array.from({ length: 3 }, (_, index) => ({ drop: index, data: [] }));

function MainPage() {
    const [widgetData, setWidgetData] = useState(initialWidgetData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const updatedWidgetData = [...widgetData];
        const sourceWidgetId = Number(source.droppableId);
        const destinationWidgetId = Number(destination.droppableId);

        const moveWidget = (sourceId: number, destinationId: number) => {
            const sourceItems = updatedWidgetData[sourceId].data;
            const destinationItems = updatedWidgetData[destinationId].data;
            const [removed] = sourceItems.splice(source.index, 1);
            destinationItems.splice(destination.index, 0, removed);
            updatedWidgetData[sourceId] = { ...updatedWidgetData[sourceId], data: sourceItems };
            updatedWidgetData[destinationId] = { ...updatedWidgetData[destinationId], data: destinationItems };
        };

        if (source.droppableId === destination.droppableId) {
            moveWidget(sourceWidgetId, sourceWidgetId);
        } else {
            moveWidget(sourceWidgetId, destinationWidgetId);
        }

        setWidgetData(updatedWidgetData);
    };

    const handleAddWidget = (evt: ChangeEvent<HTMLSelectElement>, id: number) => {
        const widgetId = widgetData.findIndex(widget => widget.drop === id);
        const newWidgetData = [...widgetData];
        newWidgetData[widgetId].data.push({ name: evt.target.value, props: null });
        setWidgetData(newWidgetData);
        evt.target.value = 'Добавить виджет';
    };

    const changeProps = (droppableId: number, index: number, props: any) => {
        const updatedWidgetData = widgetData.map((widget, i) => {
            if (i === droppableId) {
                const newData = [...widget.data];
                newData[index].props = props;
                return { ...widget, data: newData };
            }
            return widget;
        });
        setWidgetData(updatedWidgetData);
    };

    const handleDeleteButton = (id: number, index: number) => {
        const updatedWidgetData = [...widgetData];
        const widgetIndex = updatedWidgetData.findIndex(widget => widget.drop === id);

        if (widgetIndex !== -1) {
            updatedWidgetData[widgetIndex].data.splice(index, 1);
            setWidgetData(updatedWidgetData);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <WidgetBlock>
                {widgetData.map(({ drop, data }) => (
                    <div key={drop}>
                        <Select defaultValue={'Добавить виджет'} onChange={(evt) => handleAddWidget(evt, drop)}>
                            <option disabled>{'Добавить виджет'}</option>
                            {widgetList.map((widget) => (
                                <option key={widget.key} value={widget.key}>
                                    {widget.value}
                                </option>
                            ))}
                        </Select>
                        <Widget
                            id={drop}
                            columnData={data}
                            onClick={handleDeleteButton}
                            onChangeProps={changeProps}
                        />
                    </div>
                ))}
            </WidgetBlock>
        </DragDropContext>
    );
}

export default MainPage;