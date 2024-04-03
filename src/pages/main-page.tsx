import { ChangeEvent, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Widget from "../components/widget";
import { componentDictionary } from "../const-data";

function MainPage() {
    const [widgetData, setWidgetData] = useState<Array<{ id: number, component: JSX.Element | null }>>(
        Array.from({ length: 3 }, (_, index) => ({ id: index + 1, component: null }))
    );

    function onDragEnd(result: DropResult) {
        const { destination, source } = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const sourceId = Number(source.droppableId);
        const destinationId = Number(destination.droppableId);

        const sourceIndex = widgetData.findIndex(widget => widget.id === sourceId);
        const destinationIndex = widgetData.findIndex(widget => widget.id === destinationId);

        if (sourceIndex === -1 || destinationIndex === -1) {
            return;
        }

        const newWidgetData = [...widgetData];
        const temp = newWidgetData[sourceIndex];
        newWidgetData[sourceIndex] = newWidgetData[destinationIndex];
        newWidgetData[destinationIndex] = temp;

        setWidgetData(newWidgetData);
    }

    function handleAddWidget(evt: ChangeEvent<HTMLSelectElement>, id: number) {
        const widgetId = widgetData.findIndex(widget => widget.id === id)
        const SelectedWidget = componentDictionary[evt.target.value]
        const newWidgetData = [...widgetData];
        newWidgetData[widgetId] = { id, component: <SelectedWidget key={id} id={id} /> };
        setWidgetData(newWidgetData);
    }

    function handleDeleteButton(id: number) {
        const widgetId = widgetData.findIndex(widget => widget.id === id)
        const newWidgetData = [...widgetData];
        newWidgetData[widgetId] = { id, component: null };
        setWidgetData(newWidgetData);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="widget-block">
                {widgetData.map(({ id, component }) => (
                    <Widget
                        key={id}
                        id={id}
                        columnData={component}
                        onChange={(evt) => handleAddWidget(evt, id)}
                        onClick={() => handleDeleteButton(id)}
                    />
                ))}
            </div>
        </DragDropContext>
    );
}

export default MainPage;