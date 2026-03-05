import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, Calendar, Paperclip, MessageSquare } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from '@/components/common/Button';

export interface Task {
  id: string;
  content: string;
  tag?: { label: string; color: string };
  dueDate?: string;
  attachments?: number;
  comments?: number;
}

export interface ColumnData {
  id: string;
  title: string;
  taskIds: string[];
}

export interface KanbanData {
  tasks: Record<string, Task>;
  columns: Record<string, ColumnData>;
  columnOrder: string[];
}

interface KanbanBoardProps {
  initialData?: KanbanData;
  onTaskDrop?: (result: DropResult, newData: KanbanData) => void;
  className?: string;
}

// Default Data if none provided
const defaultData: KanbanData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Finalize presentation slides', tag: { label: 'Design', color: 'blue' }, dueDate: 'Oct 12' },
    'task-2': { id: 'task-2', content: 'Review quarterly financial report', tag: { label: 'Finance', color: 'green' } },
    'task-3': { id: 'task-3', content: 'Update dependencies to React 19', tag: { label: 'Dev', color: 'purple' }, comments: 3, attachments: 1 },
    'task-4': { id: 'task-4', content: 'Interview engineering candidates', dueDate: 'Oct 14', comments: 12 },
    'task-5': { id: 'task-5', content: 'Draft new marketing copy', tag: { label: 'Marketing', color: 'yellow' } },
  },
  columns: {
    'col-1': { id: 'col-1', title: 'To Do', taskIds: ['task-1', 'task-2', 'task-3'] },
    'col-2': { id: 'col-2', title: 'In Progress', taskIds: ['task-4'] },
    'col-3': { id: 'col-3', title: 'Review', taskIds: [] },
    'col-4': { id: 'col-4', title: 'Done', taskIds: ['task-5'] },
  },
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
};

const tagColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-700',
};

export function KanbanBoard({ initialData = defaultData, onTaskDrop, className }: KanbanBoardProps) {
  const [data, setData] = useState<KanbanData>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...startColumn, taskIds: newTaskIds };
      const newData = {
        ...data,
        columns: { ...data.columns, [newColumn.id]: newColumn },
      };

      setData(newData);
      if (onTaskDrop) onTaskDrop(result, newData);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...startColumn, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finishColumn, taskIds: finishTaskIds };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
    if (onTaskDrop) onTaskDrop(result, newData);
  };

  return (
    <div className={cn("flex flex-1 overflow-x-auto h-[calc(100vh-140px)] gap-6 pb-4", className)}>
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <div key={column.id} className="flex flex-col flex-shrink-0 w-[300px] h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-gray-600 bg-gray-200 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Droppable Area (Cards) */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 overflow-y-auto p-2 rounded-xl border transition-colors min-h-[150px] scrollbar-hide flex flex-col gap-3",
                      snapshot.isDraggingOver ? "bg-primary/5 border-primary/20" : "bg-gray-100/50 border-transparent"
                    )}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={cn(
                              "bg-white p-4 rounded-lg shadow-sm border border-gray-200 select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                              snapshot.isDragging ? "shadow-lg rotate-2 scale-[1.02]" : "hover:border-gray-300"
                            )}
                          >
                            {task.tag && (
                              <div className={cn("inline-block px-2 py-0.5 mb-2 text-xs font-medium rounded", tagColors[task.tag.color] || tagColors.blue)}>
                                {task.tag.label}
                              </div>
                            )}
                            <p className="text-sm text-gray-800 leading-relaxed font-medium mb-3">
                              {task.content}
                            </p>
                            
                            {/* Card Footer */}
                            {(task.dueDate || task.comments || task.attachments) && (
                              <div className="flex items-center gap-3 text-xs text-gray-500 mt-auto pt-2 border-t border-gray-100">
                                {task.dueDate && (
                                  <div className="flex items-center gap-1 text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                    <Calendar className="w-3 h-3" />
                                    <span>{task.dueDate}</span>
                                  </div>
                                )}
                                {task.comments && (
                                  <div className="flex items-center gap-1 ml-auto">
                                    <MessageSquare className="w-3 h-3" />
                                    <span>{task.comments}</span>
                                  </div>
                                )}
                                {task.attachments && (
                                  <div className="flex items-center gap-1">
                                    <Paperclip className="w-3 h-3" />
                                    <span>{task.attachments}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    
                    {/* Add Task Button at bottom of column */}
                    <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 group p-2 mt-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Add task
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
        
        {/* Add New Column */}
        <div className="flex-shrink-0 w-[300px] pt-10">
          <Button variant="outline" className="w-full justify-start border-dashed bg-transparent hover:bg-white text-gray-500 hover:text-gray-900">
            <Plus className="w-4 h-4 mr-2" />
            Add column
          </Button>
        </div>
      </DragDropContext>
    </div>
  );
}
