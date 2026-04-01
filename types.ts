
export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum UserRole {
  ADMIN = 'Admin',
  DEVELOPER = 'Developer',
  VIEWER = 'Viewer'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  systemRole: UserRole;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

export interface AuthLog {
  id: string;
  user: string;
  status: 'Success' | 'Failed';
  timestamp: string;
  ip: string;
}

export interface Deployment {
  id: string;
  version: string;
  environment: 'Production' | 'Staging';
  status: 'Success' | 'Failed' | 'In Progress';
  timestamp: string;
  logs: string[];
}

export interface SystemConfig {
  darkMode: boolean;
  notifications: boolean;
  sprintDuration: number;
  enableAI: boolean;
  enableActivityLogs: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignedTo: User;
  dueDate: string;
  columnId: string;
  activities: Activity[];
}

export interface Column {
  id: string;
  title: string;
}

export interface KanbanState {
  tasks: Task[];
  columns: Column[];
}
