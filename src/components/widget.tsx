import { ChangeEvent } from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { widgetList } from "../const-data";

type WidgetProps = {
    columnData: JSX.Element | null;
    onChange: (evt: ChangeEvent<HTMLSelectElement>, id: number) => void;
    onClick: (id: number) => void;
    id: number;
};

function Widget({ columnData, onChange, onClick, id }: WidgetProps) {
    function handleSelectChange(evt: ChangeEvent<HTMLSelectElement>) {
        onChange(evt, id);
    };

    function handleDeleteClick() {
        onClick(id);
    };

    return (
        <Droppable droppableId={String(id)}>
            {(provided: DroppableProvided) => (
                <div className="widget" ref={provided.innerRef} {...provided.droppableProps}>
                    {columnData}
                    {provided.placeholder}
                    {columnData ? (
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