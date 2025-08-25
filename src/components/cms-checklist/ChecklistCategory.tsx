import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChecklistItem } from "./ChecklistItem";
import { ChecklistItem as ChecklistItemType, ChecklistCategory as ChecklistCategoryType } from "@/pages/CMSSEOChecklist";
import { Badge } from "@/components/ui/badge";

interface ChecklistCategoryProps {
  category: ChecklistCategoryType;
  onItemStatusChange: (categoryId: string, itemId: string, status: ChecklistItemType['status']) => void;
}

export const ChecklistCategory = ({ category, onItemStatusChange }: ChecklistCategoryProps) => {
  const IconComponent = category.icon;
  
  // Calculate category completion
  const implementedCount = category.items.filter(item => item.status === 'Implementado').length;
  const completionPercentage = Math.round((implementedCount / category.items.length) * 100);
  
  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  return (
    <Card className="border-border hover:border-brand-gold/30 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-gold/10 p-3 rounded-lg">
              <IconComponent className="w-6 h-6 text-brand-gold" />
            </div>
            <div>
              <CardTitle className="text-xl text-brand-black">
                {category.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {implementedCount} de {category.items.length} itens implementados
              </p>
            </div>
          </div>
          <Badge className={`${getCompletionColor(completionPercentage)} border font-medium`}>
            {completionPercentage}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {category.items.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              onStatusChange={(status) => onItemStatusChange(category.id, item.id, status)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};