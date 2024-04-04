import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { WidgetComponent } from "../pages/main-page";
import Weather from "./widgets/weather";
import CurrencyRubles from "./widgets/currency-rubles";
import CurrencyChecker from "./widgets/currency-checker";

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
                <div className="widget" ref={provided.innerRef} {...provided.droppableProps}>
                    {columnData && columnData.map((component, index) => (
                        <div key={index}>
                            <Draggable draggableId={String(index) + String(id)} index={index}>
                                {(provided) => (
                                    <div className="widget-component" {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                                        {renderWidget(component.name, component.props, index, id)}
                                        <button value={'deleteWidget'} onClick={() => handleDeleteClick(id, index)}>
                                            Удалить Виджет
                                        </button>
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}

export default Widget;