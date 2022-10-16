import React,{useRef, useState} from 'react';


function DragNDrop({data}){
    const [list,setList] = useState(data);
    const [dragging,setDragging] = useState(false);

    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e,params) => {
        console.log('drag starting...',params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend',handleDragEnd)
        setTimeout(() => {
            setDragging(true);
        }, 0)
    }

    const handleDragEnter = (e,params) => {
        console.log('Entering drag..',params)
        const currentItem = dragItem.current;
        if(e.target !== dragNode.current){
            console.log("TARGET is not same")
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                newList[params.grpI].items.splice(params.itemI,0,newList[currentItem.grpI].items.splice(currentItem.itemI,1)[0]);
                dragItem.current = params;
                return newList;
            })
        }
    }


    const handleDragEnd = (e) => {
        console.log('Ending drag..');
        setDragging(false);
        dragItem.current = null;
        // dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        // dragItemNode.current = null;
    }

   

    return(
        <div className='drag-and-drop'>
        {list.map((grp,grpI) => (
              <div key={grp.title} className='dnd-group'
              onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null}
              >
                <div className='group-title'>{grp.title}</div>
                {grp.items.map((item,itemI) => (
                  <div draggable 
                  onDragStart={(e) => {handleDragStart(e,{grpI,itemI})}} 
                  onDragEnter = {dragging?(e) => {handleDragEnter(e,{grpI,itemI})}:null}
                  key={item} className='dnd-item'>
                  {item}
                  </div>
                ))}
              </div>
            ))}
            <div>
                {list[0].items.length}
            </div>
            <div>
                {list[1].items.length}
            </div>
      </div>
    )
}

export default DragNDrop;