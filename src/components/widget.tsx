import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Button, WidgetComponent } from "../pages/main-page";
import Weather from "./widgets/weather";
import CurrencyRubles from "./widgets/currency-rubles";
import CurrencyChecker from "./widgets/currency-checker";
import styled from "@emotion/styled";
import { WidgetsPropsType } from "../types";

const WidgetElement = styled.div`
    position: relative;
    width: 450px;
    color: white;
    border-radius: 24px;
    height: 750px;
    background-color: rgb(73, 73, 73);
    padding: 24px;
    padding-top: 50px;
    overflow: auto !important;
`

const WidgetComponentBlock = styled.div`
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 30px;
    background-color: rgb(97, 95, 95);
`

type WidgetProps = {
    columnData: WidgetComponent[] | null;
    onClick: (index: number, id: number) => void;
    id: number;
    onChangeProps: (droppableId: number, index: number, props: WidgetsPropsType) => void
};

const widgetComponents: {
    [key: string]: (props: any) => JSX.Element
} = {
    weather: Weather,
    convertRubles: CurrencyRubles,
    convertAll: CurrencyChecker
};

function Widget({ columnData, onClick, id, onChangeProps }: WidgetProps) {

    function handleDeleteClick(droppableId: number, index: number) {
        onClick(droppableId, index);
    };

    const renderWidget = (name: string, props: WidgetsPropsType, index: number, droppableId: number) => {
        const SpecificWidget = widgetComponents[name];
        if (SpecificWidget) {
            return (
                <SpecificWidget
                    key={`${index}-${droppableId}`}
                    onChangeProps={onChangeProps}
                    index={index}
                    droppableId={droppableId}
                    {...{ data: props }}
                />
            );
        }
        return null;
    };

    return (
        <Droppable droppableId={String(id)}>
            {(provided: DroppableProvided) => (
                <WidgetElement ref={provided.innerRef} {...provided.droppableProps}>
                    {columnData && columnData.map((component, index) => (
                        <div key={index}>
                            <Draggable draggableId={String(index) + String(id)} index={index}>
                                {(provided) => (
                                    <WidgetComponentBlock {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                                        {renderWidget(component.name, component.props, index, id)}
                                        <Button value={'deleteWidget'} onClick={() => handleDeleteClick(id, index)}>
                                            Удалить Виджет
                                        </Button>
                                    </WidgetComponentBlock>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {provided.placeholder}
                </WidgetElement>
            )}
        </Droppable>
    );
}

export default Widget;