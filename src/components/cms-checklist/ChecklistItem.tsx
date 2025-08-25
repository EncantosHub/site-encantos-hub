import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { ChecklistItem as ChecklistItemType } from "@/pages/CMSSEOChecklist";

interface ChecklistItemProps {
  item: ChecklistItemType;
  onStatusChange: (status: ChecklistItemType['status']) => void;
}

export const ChecklistItem = ({ item, onStatusChange }: ChecklistItemProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alto': return 'text-red-600 bg-red-100 border-red-200';
      case 'Médio': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'Baixo': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusConfig = (status: ChecklistItemType['status']) => {
    switch (status) {
      case 'Implementado':
        return {
          icon: CheckCircle,
          color: 'text-green-600 bg-green-100 border-green-200',
          label: 'Implementado'
        };
      case 'Em andamento':
        return {
          icon: Clock,
          color: 'text-yellow-600 bg-yellow-100 border-yellow-200',
          label: 'Em andamento'
        };
      case 'Não implementado':
        return {
          icon: XCircle,
          color: 'text-red-600 bg-red-100 border-red-200',
          label: 'Não implementado'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600 bg-gray-100 border-gray-200',
          label: 'Indefinido'
        };
    }
  };

  const statusConfig = getStatusConfig(item.status);
  const StatusIcon = statusConfig.icon;

  const statusOptions: ChecklistItemType['status'][] = ['Implementado', 'Em andamento', 'Não implementado'];

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      item.status === 'Implementado' ? 'border-green-200 bg-green-50' :
      item.status === 'Em andamento' ? 'border-yellow-200 bg-yellow-50' :
      'border-red-200 bg-red-50'
    }`}>
      <div className="flex flex-col space-y-3">
        {/* Header with title and priority */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <StatusIcon className={`w-5 h-5 ${statusConfig.color.split(' ')[0]}`} />
            <h3 className="font-medium text-brand-black">{item.title}</h3>
          </div>
          <Badge className={`${getPriorityColor(item.priority)} border text-xs font-medium`}>
            Prioridade {item.priority}
          </Badge>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Status buttons */}
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => {
            const config = getStatusConfig(status);
            const ConfigIcon = config.icon;
            const isActive = item.status === status;
            
            return (
              <Button
                key={status}
                variant="outline"
                size="sm"
                onClick={() => onStatusChange(status)}
                className={`transition-all ${
                  isActive 
                    ? `${config.color} border-2 shadow-sm` 
                    : 'hover:bg-muted/50 border-border'
                }`}
              >
                <ConfigIcon className={`w-4 h-4 mr-2 ${
                  isActive ? config.color.split(' ')[0] : 'text-muted-foreground'
                }`} />
                <span className={`text-xs font-medium ${
                  isActive ? config.color.split(' ')[0] : 'text-muted-foreground'
                }`}>
                  {config.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};