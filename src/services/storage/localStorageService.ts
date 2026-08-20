/**
 * Air Zone Cool CRM - Centralized LocalStorage Database Service
 */

import { Activity, Notification } from '../../types';

export const STORAGE_KEYS = {
  LEADS: 'airzonecool_leads',
  CUSTOMERS: 'airzonecool_customers',
  QUOTES: 'airzonecool_quotes',
  JOBS: 'airzonecool_jobs',
  TECHNICIANS: 'airzonecool_technicians',
  AMCS: 'airzonecool_amcs',
  AMC_VISITS: 'airzonecool_amc_visits',
  AMC_RENEWAL_AUTOMATIONS: 'airzonecool_amc_renewals',
  PAYMENTS: 'airzonecool_payments',
  REVIEWS: 'airzonecool_reviews',
  NOTIFICATIONS: 'airzonecool_notifications',
  ACTIVITIES: 'airzonecool_activities',
  TASKS: 'airzonecool_tasks',
  AUTOMATIONS: 'airzonecool_automations',
  SERVICES: 'airzonecool_services',
  SETTINGS: 'airzonecool_settings',
  SESSION: 'airzonecool_session',
  THEME: 'airzonecool_theme',
} as const;

export class LocalStorageService {
  /**
   * Safely retrieve a collection from localStorage
   */
  static getCollection<T = any>(key: string): T[] {
    try {
      const data = localStorage.getItem(key);
      if (!data) return [];
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return [];
    }
  }

  /**
   * Safely retrieve a single record by ID
   */
  static getRecord<T extends { id: string } = any>(key: string, id: string): T | undefined {
    const items = this.getCollection<T>(key);
    return items.find(item => item.id === id);
  }

  /**
   * Create a new record in a collection
   */
  static createRecord<T extends { id: string } = any>(key: string, record: T): T {
    const items = this.getCollection<T>(key);
    const existingIndex = items.findIndex(item => item.id === record.id);
    if (existingIndex >= 0) {
      items[existingIndex] = record;
    } else {
      items.unshift(record);
    }
    this.replaceCollection(key, items);
    return record;
  }

  /**
   * Update an existing record in a collection
   */
  static updateRecord<T extends { id: string } = any>(key: string, id: string, updates: Partial<T> | Record<string, any>): T | undefined {
    const items = this.getCollection<T>(key);
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return undefined;

    const updated = { ...items[index], ...updates };
    items[index] = updated;
    this.replaceCollection(key, items);
    return updated;
  }

  /**
   * Delete a record from a collection
   */
  static deleteRecord<T extends { id: string } = any>(key: string, id: string): boolean {
    const items = this.getCollection<T>(key);
    const filtered = items.filter(item => item.id !== id);
    if (filtered.length === items.length) return false;
    this.replaceCollection(key, filtered);
    return true;
  }

  /**
   * Replace an entire collection
   */
  static replaceCollection<T = any>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing key "${key}" to localStorage:`, error);
    }
  }

  /**
   * Clear a specific collection
   */
  static clearCollection(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing key "${key}" from localStorage:`, error);
    }
  }

  /**
   * Get single object (like settings or session)
   */
  static getObject<T = any>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch (error) {
      console.error(`Error reading object "${key}" from localStorage:`, error);
      return defaultValue;
    }
  }

  /**
   * Save single object
   */
  static saveObject<T = any>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving object "${key}" to localStorage:`, error);
    }
  }

  static setObject<T = any>(key: string, data: T): void {
    this.saveObject(key, data);
  }

  /**
   * Log an activity audit trail
   */
  static logActivity(
    type: Activity['type'],
    title: string,
    description: string,
    user: string = 'System Admin',
    relatedId?: string,
    relatedType?: string
  ): Activity {
    const activities = this.getCollection<Activity>(STORAGE_KEYS.ACTIVITIES);
    const newActivity: Activity = {
      id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      title,
      description,
      timestamp: new Date().toISOString(),
      user,
      relatedId,
      relatedType,
    };
    activities.unshift(newActivity);
    this.replaceCollection(STORAGE_KEYS.ACTIVITIES, activities.slice(0, 200));
    return newActivity;
  }

  /**
   * Add activity alias for object argument
   */
  static addActivity(data: {
    title: string;
    description: string;
    type?: any;
    user?: string;
    relatedId?: string;
    relatedType?: string;
  }): Activity {
    return this.logActivity(
      data.type || 'system',
      data.title,
      data.description,
      data.user || 'Admin',
      data.relatedId,
      data.relatedType
    );
  }

  /**
   * Push a system notification
   */
  static pushNotification(
    title: string,
    message: string,
    type: Notification['type'] = 'system',
    linkTo?: string
  ): Notification {
    const notifications = this.getCollection<Notification>(STORAGE_KEYS.NOTIFICATIONS);
    const newNotification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      linkTo,
    };
    notifications.unshift(newNotification);
    this.replaceCollection(STORAGE_KEYS.NOTIFICATIONS, notifications.slice(0, 100));
    return newNotification;
  }

  /**
   * Add notification alias for object argument
   */
  static addNotification(data: {
    title: string;
    message: string;
    type?: any;
    linkTo?: string;
  }): Notification {
    return this.pushNotification(data.title, data.message, data.type || 'system', data.linkTo);
  }

  /**
   * Export all database keys as JSON string
   */
  static exportDatabase(): string {
    const backup: Record<string, any> = {};
    Object.values(STORAGE_KEYS).forEach(key => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          backup[key] = JSON.parse(item);
        }
      } catch (err) {
        console.error(`Failed to export key ${key}`, err);
      }
    });
    return JSON.stringify(backup, null, 2);
  }

  /**
   * Import database from JSON string
   */
  static importDatabase(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed !== 'object' || parsed === null) return false;
      Object.keys(parsed).forEach(key => {
        localStorage.setItem(key, JSON.stringify(parsed[key]));
      });
      return true;
    } catch (err) {
      console.error('Failed to import database', err);
      return false;
    }
  }
}
