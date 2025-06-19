import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Search,
  Package,
  Tag,
  Layers,
  Star,
} from "lucide-react";

const CategoryPageTest = () => {
  const getLevelStyles = (level) => {
    switch (level) {
      case 1:
        return "bg-blue-50 border-blue-200 text-blue-900";
      case 2:
        return "bg-green-50 border-green-200 text-green-900";
      case 3:
        return "bg-purple-50 border-purple-200 text-purple-900";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 1:
        return <Layers className="h-4 w-4" />;
      case 2:
        return <Package className="h-4 w-4" />;
      case 3:
        return <Tag className="h-4 w-4" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your e-commerce product categories
          </p>
        </div>
        ``
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Root Category
        </Button>
      </div>
      {/* Category Tree */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Category Hierarchy</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-2">
            {/* {filteredCategories.map((category) => (
              <CategoryItem key={category._id} category={category} />
            ))} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryPageTest;
