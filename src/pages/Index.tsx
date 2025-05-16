import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '@/components/Hero';
import ComponentFilter from '@/components/ComponentFilter';
import ComponentCard from '@/components/ComponentCard';
import { UsageDrawer } from '@/components/UsageDrawer';
import { showInstallToast } from '@/components/InstallToast';
import { components, categories, ComponentType } from '@/data/components';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ComponentSidebar from '@/components/ComponentSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowDown, ArrowUp, Filter } from "lucide-react";
import Header from '@/components/Header';

const Index = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular' | 'hot'>('latest');
  const itemsPerPage = 8;

  // Filter components based on category and search query
  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort components based on the selected order
  const sortedComponents = [...filteredComponents].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt || Date.now()).getTime() - new Date(a.createdAt || Date.now()).getTime();
    } else if (sortOrder === 'popular') {
      return (b.downloads || 0) - (a.downloads || 0);
    } else if (sortOrder === 'hot') {
      return (b.stars || 0) - (a.stars || 0);
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedComponents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComponents = sortedComponents.slice(startIndex, endIndex);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortOrder]);

  const handleInstallClick = (component: ComponentType) => {
    showInstallToast(component);
  };

  const handleUsageClick = (component: ComponentType) => {
    setSelectedComponent(component);
    setIsDrawerOpen(true);
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          isActive={currentPage === 1} 
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i === 1 || i === totalPages) continue; // Skip first and last as they're always shown
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={currentPage === i} 
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            isActive={currentPage === totalPages} 
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <div className="flex flex-1">
          <ComponentSidebar 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex-1 container mx-auto px-4 py-8">
            <Hero />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <ComponentFilter 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                <div className="w-full md:w-auto">
                  <ToggleGroup type="single" value={sortOrder} onValueChange={(value) => {
                    if (value) setSortOrder(value as 'latest' | 'popular' | 'hot');
                  }} className="justify-start">
                    <ToggleGroupItem value="latest" aria-label="Sort by latest" className="flex items-center gap-2">
                      <ArrowDown className="h-4 w-4" />
                      <span>{t('common.latest')}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="popular" aria-label="Sort by popular" className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4" />
                      <span>{t('common.popular')}</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="hot" aria-label="Sort by hot" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>{t('common.hot')}</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={t('common.searchComponents')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {currentComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onClickInstall={handleInstallClick}
                  onClickUsage={handleUsageClick}
                />
              ))}
            </div>

            {sortedComponents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{t('common.noComponents')}</p>
              </div>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {generatePaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <UsageDrawer 
            component={selectedComponent} 
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
