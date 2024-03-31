import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { ChangeEvent, useState } from "react";
import Widget from "../components/widget";
import { componentDictionary } from "../const-data";

function MainPage() {
    const [columnData, setColumnData] = useState<(JSX.Element | null)[]>([null, null, null])

    function onDragEnd(result: DropResult) {
        const { destination, source } = result;

        if (!destination || destination.droppableId === source.droppableId) {
            return;
        }

        const DragElement = columnData[Number(source.droppableId) - 1]
        const DropElement = columnData[Number(destination.droppableId) - 1]

        const newColumnData = [...columnData]
        newColumnData[Number(source.droppableId) - 1] = DropElement
        newColumnData[Number(destination.droppableId) - 1] = DragElement

        setColumnData(newColumnData)
    };

    function handleAddWidget(evt: ChangeEvent<HTMLSelectElement>, id: number) {
        const SelectedWidget = componentDictionary[evt.target.value]
        const newColumnData = [...columnData]
        newColumnData[id - 1] = <SelectedWidget key={id} id={String(id)} />
        setColumnData(newColumnData)
    }

    function handleDeleteButton(id: number) {
        const newColumnData = [...columnData]
        newColumnData[id - 1] = null
        setColumnData(newColumnData)
    }

    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <div className="widget-block">
                {
                    Array.from({ length: 3 }, (_, index) => (
                        <Widget
                            key={index}
                            id={index}
                            columnData={columnData}
                            onChange={handleAddWidget}
                            onClick={handleDeleteButton}
                        />
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default MainPage;