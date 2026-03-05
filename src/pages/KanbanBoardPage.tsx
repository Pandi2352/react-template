import { KanbanBoard } from '@/components/common/KanbanBoard';
import { useUI } from '@/hooks';

export function KanbanBoardPage() {
  const { addToast } = useUI();

  const handleTaskDrop = () => {
    // We only simulate saving state for this showcase
    addToast({
      message: 'Workflow updated successfully',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 -m-4 sm:-m-4 lg:-m-4 p-4 sm:p-4 lg:p-4 pb-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Board</h1>
          <p className="text-sm text-gray-500 mt-1">
            Drag-and-drop Kanban view built with @hello-pangea/dnd.
          </p>
        </div>
      </div>

      {/* 
        This div wraps the board and allows it to fill the remaining height. 
        The overflow is handled within the KanbanBoard component 
      */}
      <div className="flex-1 w-full relative min-h-0">
        <KanbanBoard onTaskDrop={handleTaskDrop} />
      </div>
    </div>
  );
}
