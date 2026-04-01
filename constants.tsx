
import { Layout, CheckCircle, Clock, Shield, Settings, Users, Terminal, Zap } from 'lucide-react';
import { Task, Priority, Column, User, UserRole, AuthLog, Deployment } from './types';

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Rivera', avatar: 'https://picsum.photos/seed/alex/100/100', role: 'DevOps Lead', email: 'alex@devconnect.it', systemRole: UserRole.ADMIN },
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah/100/100', role: 'Frontend Architect', email: 'sarah@devconnect.it', systemRole: UserRole.DEVELOPER },
  { id: 'u3', name: 'Mike Johnson', avatar: 'https://picsum.photos/seed/mike/100/100', role: 'Security Engineer', email: 'mike@devconnect.it', systemRole: UserRole.VIEWER },
];

export const MOCK_AUTH_LOGS: AuthLog[] = [
  { id: 'log-1', user: 'Alex Rivera', status: 'Success', timestamp: '2024-05-15 09:12:44', ip: '192.168.1.45' },
  { id: 'log-2', user: 'Mike Johnson', status: 'Failed', timestamp: '2024-05-15 08:33:01', ip: '45.12.33.9' },
  { id: 'log-3', user: 'Sarah Chen', status: 'Success', timestamp: '2024-05-14 22:15:12', ip: '10.0.0.8' },
];

export const MOCK_DEPLOYMENTS: Deployment[] = [
  { 
    id: 'dep-1', 
    version: 'v2.5.1', 
    environment: 'Production', 
    status: 'Success', 
    timestamp: '2024-05-14 14:00',
    logs: ['Initializing...', 'Checking dependencies...', 'Build successful', 'Uploading to cluster...', 'Deployment complete.']
  },
  { 
    id: 'dep-2', 
    version: 'v2.5.0-rc1', 
    environment: 'Staging', 
    status: 'Failed', 
    timestamp: '2024-05-14 11:20',
    logs: ['Initializing...', 'Error: Unit tests failed at line 452', 'Build aborted.']
  },
];

export const MOCK_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Completed' },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Migrate DB to Cloud Cluster',
    description: 'Relocate all production databases to the new multi-region cloud cluster.',
    priority: Priority.HIGH,
    assignedTo: MOCK_USERS[0],
    dueDate: '2024-05-20',
    columnId: 'todo',
    activities: [{ id: 'a1', user: 'System', action: 'Task created', timestamp: '2h ago' }]
  },
  {
    id: 'task-2',
    title: 'Security Patch v2.4.1',
    description: 'Apply high-criticality security patches to the authentication microservice.',
    priority: Priority.HIGH,
    assignedTo: MOCK_USERS[2],
    dueDate: '2024-05-18',
    columnId: 'inprogress',
    activities: [{ id: 'a2', user: 'Mike Johnson', action: 'Started implementation', timestamp: '1h ago' }]
  }
];

export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Layout },
  { id: 'sprints', label: 'Active Sprints', icon: Zap },
  { id: 'security', label: 'Security Center', icon: Shield },
  { id: 'team', label: 'Team Pulse', icon: Users },
  { id: 'ci-cd', label: 'CI/CD Pipelines', icon: Terminal },
  { id: 'settings', label: 'System Config', icon: Settings },
];
