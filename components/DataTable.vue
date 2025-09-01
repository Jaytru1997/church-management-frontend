<template>
  <div class="glass-card p-6">
    <!-- Table Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-semibold gradient-text">{{ title }}</h3>
        <p v-if="subtitle" class="text-white/70 mt-1">{{ subtitle }}</p>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Search -->
        <div v-if="searchable" class="relative">
          <input
            v-model="searchQuery"
            type="text"
            class="form-input pl-10 w-64"
            :placeholder="searchPlaceholder"
          />
          <svg
            class="absolute left-3 top-3 h-4 w-4 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Bulk Actions -->
        <div
          v-if="bulkActions && selectedItems.length > 0"
          class="flex items-center space-x-2"
        >
          <span class="text-sm text-white/60"
            >{{ selectedItems.length }} selected</span
          >
          <button
            v-for="action in bulkActions"
            :key="action.key"
            @click="handleBulkAction(action)"
            class="btn-ghost text-sm"
          >
            {{ action.label }}
          </button>
          <button
            @click="clearSelection"
            class="text-white/60 hover:text-white text-sm"
          >
            Clear
          </button>
        </div>

        <!-- Actions -->
        <slot name="actions" />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <!-- Table Header -->
        <thead>
          <tr class="border-b border-white/10">
            <!-- Select All Checkbox -->
            <th v-if="selectable" class="px-4 py-3 text-left">
              <input
                v-model="selectAll"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
              />
            </th>

            <!-- Column Headers -->
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-4 py-3 text-left text-xs font-medium text-white/60 uppercase tracking-wider"
              :class="{ 'cursor-pointer hover:text-white': column.sortable }"
              @click="column.sortable && sortBy(column.key)"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <svg
                  v-if="column.sortable"
                  class="w-4 h-4"
                  :class="{
                    'text-purple-400': sortField === column.key,
                    'text-white/40': sortField !== column.key,
                  }"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    v-if="sortField === column.key && sortOrder === 'asc'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </th>

            <!-- Actions Column -->
            <th
              v-if="actions"
              class="px-4 py-3 text-right text-xs font-medium text-white/60 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <!-- Table Body -->
        <tbody class="divide-y divide-white/5">
          <!-- Loading State -->
          <tr v-if="loading">
            <td :colspan="totalColumns" class="px-4 py-12 text-center">
              <div class="flex items-center justify-center">
                <div class="loading-spinner w-8 h-8"></div>
                <span class="ml-3 text-white/60">Loading...</span>
              </div>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-else-if="filteredItems.length === 0">
            <td :colspan="totalColumns" class="px-4 py-12 text-center">
              <div class="icon-container w-16 h-16 mx-auto mb-4">
                <svg
                  class="w-8 h-8 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <p class="text-white/60">{{ emptyMessage }}</p>
            </td>
          </tr>

          <!-- Data Rows -->
          <tr
            v-else
            v-for="item in paginatedItems"
            :key="item.id || item._id"
            class="hover:bg-white/5 transition-colors"
          >
            <!-- Selection Checkbox -->
            <td v-if="selectable" class="px-4 py-4">
              <input
                :value="item.id || item._id"
                v-model="selectedItems"
                type="checkbox"
                class="h-4 w-4 text-purple-600 focus:ring-purple-500 bg-white/10"
              />
            </td>

            <!-- Data Columns -->
            <td v-for="column in columns" :key="column.key" class="px-4 py-4">
              <slot
                :name="`column-${column.key}`"
                :item="item"
                :value="getValue(item, column)"
              >
                <span class="text-white/80">
                  {{ formatValue(getValue(item, column), column) }}
                </span>
              </slot>
            </td>

            <!-- Actions Column -->
            <td v-if="actions" class="px-4 py-4 text-right">
              <div class="flex items-center justify-end space-x-2">
                <button
                  v-for="action in actions"
                  :key="action.key"
                  @click="handleAction(action, item)"
                  :class="action.class || 'btn-ghost text-sm'"
                  :title="action.label"
                >
                  <component
                    :is="action.icon"
                    v-if="action.iconComponent"
                    class="w-4 h-4"
                  />
                  <span v-else>{{ action.label }}</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="showPagination && totalPages > 1"
      class="flex items-center justify-between mt-6 pt-6 border-t border-white/10"
    >
      <div class="flex items-center space-x-2">
        <span class="text-sm text-white/60">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, totalItems) }} of
          {{ totalItems }} entries
        </span>
      </div>

      <div class="flex items-center space-x-2">
        <button
          @click="currentPage = Math.max(1, currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div class="flex items-center space-x-1">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              page === currentPage
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-white/60 hover:text-white hover:bg-white/10',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage = Math.min(totalPages, currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-ghost text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  type?: "text" | "number" | "date" | "currency" | "boolean";
  format?: (value: any) => string;
}

interface Action {
  key: string;
  label: string;
  icon?: string;
  iconComponent?: any;
  class?: string;
  handler?: (item: any) => void;
}

interface BulkAction {
  key: string;
  label: string;
  handler: (items: any[]) => void;
}

interface Props {
  title: string;
  subtitle?: string;
  items: any[];
  columns: Column[];
  actions?: Action[];
  bulkActions?: BulkAction[];
  searchable?: boolean;
  searchPlaceholder?: string;
  selectable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  itemsPerPage?: number;
  showPagination?: boolean;
}

interface Emits {
  (e: "action", action: Action, item: any): void;
  (e: "bulk-action", action: BulkAction, items: any[]): void;
  (e: "selection-change", selectedItems: any[]): void;
  (e: "sort", field: string, order: "asc" | "desc"): void;
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: "",
  searchable: true,
  searchPlaceholder: "Search...",
  selectable: false,
  loading: false,
  emptyMessage: "No items found",
  itemsPerPage: 10,
  showPagination: true,
});

const emit = defineEmits<Emits>();

// Reactive state
const searchQuery = ref("");
const selectedItems = ref<any[]>([]);
const currentPage = ref(1);
const sortField = ref("");
const sortOrder = ref<"asc" | "desc">("asc");

// Computed properties
const selectAll = computed({
  get: () =>
    selectedItems.value.length === paginatedItems.value.length &&
    paginatedItems.value.length > 0,
  set: (value) => {
    if (value) {
      selectedItems.value = paginatedItems.value.map(
        (item) => item.id || item._id
      );
    } else {
      selectedItems.value = [];
    }
    emit("selection-change", selectedItems.value);
  },
});

const filteredItems = computed(() => {
  let items = [...props.items];

  // Search filter
  if (searchQuery.value) {
    items = items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    );
  }

  // Sort
  if (sortField.value) {
    items.sort((a, b) => {
      const aValue = getValue(a, { key: sortField.value, label: "" });
      const bValue = getValue(b, { key: sortField.value, label: "" });

      if (aValue < bValue) return sortOrder.value === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === "asc" ? 1 : -1;
      return 0;
    });
  }

  return items;
});

const totalItems = computed(() => filteredItems.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / props.itemsPerPage)
);
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});

const totalColumns = computed(() => {
  let count = props.columns.length;
  if (props.selectable) count++;
  if (props.actions) count++;
  return count;
});

// Methods
const getValue = (item: any, column: Column) => {
  return column.key.split(".").reduce((obj, key) => obj?.[key], item);
};

const formatValue = (value: any, column: Column) => {
  if (column.format) {
    return column.format(value);
  }

  switch (column.type) {
    case "currency":
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(value);
    case "date":
      return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(value)
      );
    case "boolean":
      return value ? "Yes" : "No";
    default:
      return value;
  }
};

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortOrder.value = "asc";
  }
  emit("sort", field, sortOrder.value);
};

const handleAction = (action: Action, item: any) => {
  if (action.handler) {
    action.handler(item);
  } else {
    emit("action", action, item);
  }
};

const handleBulkAction = (action: BulkAction) => {
  const selectedItemsData = props.items.filter((item) =>
    selectedItems.value.includes(item.id || item._id)
  );

  if (action.handler) {
    action.handler(selectedItemsData);
  } else {
    emit("bulk-action", action, selectedItemsData);
  }
};

const clearSelection = () => {
  selectedItems.value = [];
  emit("selection-change", selectedItems.value);
};

// Watchers
watch(selectedItems, (newSelection) => {
  emit("selection-change", newSelection);
});

watch(
  () => props.items,
  () => {
    currentPage.value = 1;
    selectedItems.value = [];
  }
);

watch(searchQuery, () => {
  currentPage.value = 1;
});
</script>
