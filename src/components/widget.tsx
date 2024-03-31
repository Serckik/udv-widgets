import { ChangeEvent } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { widgetList } from "../const-data";

type WidgetProps = {
    columnData: (JSX.Element | null)[];
    onChange: (evt: ChangeEvent<HTMLSelectElement>, id: number) => void;
    onClick: (id: number) => void;
    id: number;
};

function Widget({ columnData, onChange, onClick, id }: WidgetProps) {
    function handleSelectChange(evt: ChangeEvent<HTMLSelectElement>) {
        onChange(evt, id + 1);
    };

    function handleDeleteClick() {
        onClick(id + 1);
    };

    return (
        <Droppable droppableId={String(id + 1)}>
            {(provided: DroppableProvided) => (
                <div className="widget" ref={provided.innerRef} {...provided.droppableProps}>
                    {columnData[id] && columnData[id]}
                    {provided.placeholder}
                    {columnData[id] ? (
                        <button value={'deleteWidget'} onClick={handleDeleteClick}>
                            Удалить Виджет
                        </button>
                    ) : (
                        <select className="widget-select" defaultValue={'Добавить виджет'} onChange={handleSelectChange}>
                            <option disabled>{'Добавить виджет'}</option>
                            {widgetList.map((widget) => (
                                <option key={widget} value={widget}>
                                    {widget}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}
        </Droppable>
    );
}

export default Widget;