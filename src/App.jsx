import React, { useState, createContext, useContext } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Truck, Users, Calendar, ChevronDown, ChevronUp, Search, Bell, Settings, BarChart3, Shield, Fuel, Clock, MapPin, AlertTriangle, CheckCircle, X, Building2, FileText, Activity, TrendingUp, LayoutDashboard, Navigation, Video, Wrench, FileCheck, MessageSquare, HelpCircle, User, ChevronRight, Filter, MoreHorizontal, ArrowUpDown, Plus, Check, GripVertical, Download, Layers, Table, Hash, ClipboardCheck, Play, Eye, Share2, Lock, Globe } from 'lucide-react';

// Alias for Route (not exported from lucide-react)
const Route = Navigation;

// ============================================
// MOCK DATA FOR ALL DATASETS
// ============================================

// Organization Mock Data
const mockOrganizationData = [
  { org_name: 'Fleet Europe', region_id: 'REG-EU', region_name: 'Europe', branch_id: 'BR-FR', branch_name: 'France', team_id: 'TM-PAR', team_name: 'Paris Fleet', tag_id: 'TAG-001', tag_name: 'Paris Fleet', vehicle_count: 12, driver_count: 18, manager_name: 'Sophie Martin', manager_email: 'sophie.martin@company.com', timezone: 'Europe/Paris', country: 'France' },
  { org_name: 'Fleet Europe', region_id: 'REG-EU', region_name: 'Europe', branch_id: 'BR-FR', branch_name: 'France', team_id: 'TM-LYO', team_name: 'Lyon Operations', tag_id: 'TAG-002', tag_name: 'Lyon Operations', vehicle_count: 8, driver_count: 11, manager_name: 'Marc Dupont', manager_email: 'marc.dupont@company.com', timezone: 'Europe/Paris', country: 'France' },
  { org_name: 'Fleet Europe', region_id: 'REG-EU', region_name: 'Europe', branch_id: 'BR-DE', branch_name: 'Germany', team_id: 'TM-BER', team_name: 'Berlin Hub', tag_id: 'TAG-003', tag_name: 'Berlin Hub', vehicle_count: 10, driver_count: 14, manager_name: 'Klaus Weber', manager_email: 'klaus.weber@company.com', timezone: 'Europe/Berlin', country: 'Germany' },
  { org_name: 'Fleet Europe', region_id: 'REG-EU', region_name: 'Europe', branch_id: 'BR-DE', branch_name: 'Germany', team_id: 'TM-HAM', team_name: 'Hamburg Port', tag_id: 'TAG-004', tag_name: 'Hamburg Port', vehicle_count: 18, driver_count: 25, manager_name: 'Anna Schmidt', manager_email: 'anna.schmidt@company.com', timezone: 'Europe/Berlin', country: 'Germany' },
  { org_name: 'Fleet Europe', region_id: 'REG-UK', region_name: 'United Kingdom', branch_id: 'BR-ENG', branch_name: 'England', team_id: 'TM-LON', team_name: 'London Metro', tag_id: 'TAG-005', tag_name: 'London Metro', vehicle_count: 14, driver_count: 20, manager_name: 'James Wilson', manager_email: 'james.wilson@company.com', timezone: 'Europe/London', country: 'United Kingdom' },
];

// Assets Mock Data
const mockAssetsData = [
  { asset_id: 'AST-001', asset_name: 'TRK-2847', vin: 'WDB9634031L123456', license_plate: 'AB-123-CD', make: 'Mercedes-Benz', model: 'Actros 1845', year: 2022, asset_type: 'Truck', odometer: 145678, engine_hours: 4532, fuel_level: 72, gateway_serial: 'GW-98765', camera_status: 'Online', last_location: 'A1 Motorway, Lille', current_driver_id: 'DRV-001', current_driver_name: 'Jean-Pierre Moreau', tag_id: 'TAG-001', tags: 'Paris Fleet' },
  { asset_id: 'AST-002', asset_name: 'TRK-1923', vin: 'WDB9634031L234567', license_plate: 'HH-456-DE', make: 'MAN', model: 'TGX 18.500', year: 2021, asset_type: 'Truck', odometer: 198234, engine_hours: 5678, fuel_level: 45, gateway_serial: 'GW-87654', camera_status: 'Online', last_location: 'Hamburg Port Terminal', current_driver_id: 'DRV-002', current_driver_name: 'Klaus Schmidt', tag_id: 'TAG-004', tags: 'Hamburg Port' },
  { asset_id: 'AST-003', asset_name: 'TRK-4472', vin: 'WDB9634031L345678', license_plate: 'LY-789-EF', make: 'Volvo', model: 'FH16 750', year: 2023, asset_type: 'Truck', odometer: 67890, engine_hours: 2345, fuel_level: 88, gateway_serial: 'GW-76543', camera_status: 'Online', last_location: 'Lyon Distribution Center', current_driver_id: 'DRV-003', current_driver_name: 'Marie Dubois', tag_id: 'TAG-002', tags: 'Lyon Operations' },
  { asset_id: 'AST-004', asset_name: 'VAN-0891', vin: 'WDB9634031L456789', license_plate: 'BE-012-GH', make: 'Mercedes-Benz', model: 'Sprinter 316', year: 2022, asset_type: 'Van', odometer: 89456, engine_hours: 3456, fuel_level: 62, gateway_serial: 'GW-65432', camera_status: 'Online', last_location: 'Berlin Warehouse', current_driver_id: 'DRV-004', current_driver_name: 'Erik Larsen', tag_id: 'TAG-003', tags: 'Berlin Hub' },
  { asset_id: 'AST-005', asset_name: 'TRK-6234', vin: 'WDB9634031L567890', license_plate: 'PA-345-IJ', make: 'DAF', model: 'XF 530', year: 2021, asset_type: 'Truck', odometer: 234567, engine_hours: 7890, fuel_level: 34, gateway_serial: 'GW-54321', camera_status: 'Offline', last_location: 'Paris Ring Road', current_driver_id: 'DRV-005', current_driver_name: 'Priya Sharma', tag_id: 'TAG-001', tags: 'Paris Fleet' },
  { asset_id: 'AST-006', asset_name: 'TRK-7891', vin: 'WDB9634031L678901', license_plate: 'LO-678-KL', make: 'Scania', model: 'R 500', year: 2022, asset_type: 'Truck', odometer: 156789, engine_hours: 5234, fuel_level: 56, gateway_serial: 'GW-43210', camera_status: 'Online', last_location: 'London M25', current_driver_id: 'DRV-006', current_driver_name: 'Luca Rossi', tag_id: 'TAG-005', tags: 'London Metro' },
  { asset_id: 'AST-007', asset_name: 'TRK-3345', vin: 'WDB9634031L789012', license_plate: 'PA-901-MN', make: 'Renault', model: 'T High 520', year: 2023, asset_type: 'Truck', odometer: 45678, engine_hours: 1567, fuel_level: 91, gateway_serial: 'GW-32109', camera_status: 'Online', last_location: 'Paris CDG Airport', current_driver_id: 'DRV-007', current_driver_name: 'Antoine Bernard', tag_id: 'TAG-001', tags: 'Paris Fleet' },
  { asset_id: 'AST-008', asset_name: 'TRK-5567', vin: 'WDB9634031L890123', license_plate: 'HH-234-OP', make: 'MAN', model: 'TGS 18.420', year: 2021, asset_type: 'Truck', odometer: 287654, engine_hours: 8765, fuel_level: 23, gateway_serial: 'GW-21098', camera_status: 'Online', last_location: 'Hamburg A7 Junction', current_driver_id: 'DRV-008', current_driver_name: 'Hans Mueller', tag_id: 'TAG-004', tags: 'Hamburg Port' },
];

// Drivers Mock Data
const mockDriversData = [
  { driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', employee_id: 'EMP-1001', email: 'jp.moreau@company.com', phone: '+33 6 12 34 56 78', license_number: 'FR123456789', license_state: 'France', license_expiry: '2026-05-15', driver_status: 'Active', safety_score: 92, total_distance: 45678, total_drive_time: 1234, harsh_events: 3, speeding_events: 5, hos_violations: 0, idle_time: 45, assigned_asset_id: 'AST-001', assigned_asset_name: 'TRK-2847', tag_id: 'TAG-001', tags: 'Paris Fleet', coach_name: 'Sophie Martin', hire_date: '2019-03-15' },
  { driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', employee_id: 'EMP-1002', email: 'k.schmidt@company.com', phone: '+49 170 123 4567', license_number: 'DE987654321', license_state: 'Germany', license_expiry: '2025-11-20', driver_status: 'Active', safety_score: 88, total_distance: 67890, total_drive_time: 1567, harsh_events: 7, speeding_events: 12, hos_violations: 1, idle_time: 78, assigned_asset_id: 'AST-002', assigned_asset_name: 'TRK-1923', tag_id: 'TAG-004', tags: 'Hamburg Port', coach_name: 'Anna Schmidt', hire_date: '2018-07-22' },
  { driver_id: 'DRV-003', driver_name: 'Marie Dubois', employee_id: 'EMP-1003', email: 'm.dubois@company.com', phone: '+33 6 98 76 54 32', license_number: 'FR234567890', license_state: 'France', license_expiry: '2027-02-28', driver_status: 'Active', safety_score: 96, total_distance: 34567, total_drive_time: 987, harsh_events: 1, speeding_events: 2, hos_violations: 0, idle_time: 23, assigned_asset_id: 'AST-003', assigned_asset_name: 'TRK-4472', tag_id: 'TAG-002', tags: 'Lyon Operations', coach_name: 'Marc Dupont', hire_date: '2020-01-10' },
  { driver_id: 'DRV-004', driver_name: 'Erik Larsen', employee_id: 'EMP-1004', email: 'e.larsen@company.com', phone: '+49 171 234 5678', license_number: 'DE876543210', license_state: 'Germany', license_expiry: '2026-08-10', driver_status: 'Active', safety_score: 85, total_distance: 56789, total_drive_time: 1345, harsh_events: 9, speeding_events: 15, hos_violations: 2, idle_time: 89, assigned_asset_id: 'AST-004', assigned_asset_name: 'VAN-0891', tag_id: 'TAG-003', tags: 'Berlin Hub', coach_name: 'Klaus Weber', hire_date: '2017-11-05' },
  { driver_id: 'DRV-005', driver_name: 'Priya Sharma', employee_id: 'EMP-1005', email: 'p.sharma@company.com', phone: '+33 6 45 67 89 01', license_number: 'FR345678901', license_state: 'France', license_expiry: '2025-04-22', driver_status: 'Active', safety_score: 91, total_distance: 78901, total_drive_time: 1678, harsh_events: 4, speeding_events: 8, hos_violations: 0, idle_time: 56, assigned_asset_id: 'AST-005', assigned_asset_name: 'TRK-6234', tag_id: 'TAG-001', tags: 'Paris Fleet', coach_name: 'Sophie Martin', hire_date: '2021-06-18' },
  { driver_id: 'DRV-006', driver_name: 'Luca Rossi', employee_id: 'EMP-1006', email: 'l.rossi@company.com', phone: '+44 7700 123456', license_number: 'UK456789012', license_state: 'United Kingdom', license_expiry: '2026-12-31', driver_status: 'Active', safety_score: 89, total_distance: 89012, total_drive_time: 1890, harsh_events: 6, speeding_events: 10, hos_violations: 1, idle_time: 67, assigned_asset_id: 'AST-006', assigned_asset_name: 'TRK-7891', tag_id: 'TAG-005', tags: 'London Metro', coach_name: 'James Wilson', hire_date: '2019-09-25' },
  { driver_id: 'DRV-007', driver_name: 'Antoine Bernard', employee_id: 'EMP-1007', email: 'a.bernard@company.com', phone: '+33 6 23 45 67 89', license_number: 'FR456789012', license_state: 'France', license_expiry: '2027-07-14', driver_status: 'Active', safety_score: 94, total_distance: 23456, total_drive_time: 678, harsh_events: 2, speeding_events: 3, hos_violations: 0, idle_time: 34, assigned_asset_id: 'AST-007', assigned_asset_name: 'TRK-3345', tag_id: 'TAG-001', tags: 'Paris Fleet', coach_name: 'Sophie Martin', hire_date: '2022-02-14' },
  { driver_id: 'DRV-008', driver_name: 'Hans Mueller', employee_id: 'EMP-1008', email: 'h.mueller@company.com', phone: '+49 172 345 6789', license_number: 'DE765432109', license_state: 'Germany', license_expiry: '2025-09-30', driver_status: 'Active', safety_score: 82, total_distance: 123456, total_drive_time: 2345, harsh_events: 12, speeding_events: 18, hos_violations: 3, idle_time: 112, assigned_asset_id: 'AST-008', assigned_asset_name: 'TRK-5567', tag_id: 'TAG-004', tags: 'Hamburg Port', coach_name: 'Anna Schmidt', hire_date: '2016-04-08' },
];

// Trips Mock Data
const mockTripsData = [
  { trip_id: 'TRP-001', asset_id: 'AST-001', asset_name: 'TRK-2847', driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', start_time: '2024-12-23 06:30', end_time: '2024-12-23 14:45', start_location: 'Paris CDG', end_location: 'Lille Terminal', start_address: 'Rue du Fret, 95700 Roissy', end_address: 'Zone Industrielle, 59000 Lille', distance: 245, duration: 495, max_speed: 95, avg_speed: 72, idle_time: 25, fuel_consumed: 78, tag_id: 'TAG-001', tags: 'Paris Fleet' },
  { trip_id: 'TRP-002', asset_id: 'AST-002', asset_name: 'TRK-1923', driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', start_time: '2024-12-23 05:00', end_time: '2024-12-23 11:30', start_location: 'Hamburg Port', end_location: 'Berlin Warehouse', start_address: 'Hafenstrasse 1, 20457 Hamburg', end_address: 'Industrieweg 5, 10115 Berlin', distance: 289, duration: 390, max_speed: 98, avg_speed: 78, idle_time: 18, fuel_consumed: 92, tag_id: 'TAG-004', tags: 'Hamburg Port' },
  { trip_id: 'TRP-003', asset_id: 'AST-003', asset_name: 'TRK-4472', driver_id: 'DRV-003', driver_name: 'Marie Dubois', start_time: '2024-12-23 07:15', end_time: '2024-12-23 12:00', start_location: 'Lyon Center', end_location: 'Marseille Port', start_address: 'Rue de la Logistique, 69000 Lyon', end_address: 'Port de Marseille, 13002 Marseille', distance: 315, duration: 285, max_speed: 92, avg_speed: 85, idle_time: 12, fuel_consumed: 98, tag_id: 'TAG-002', tags: 'Lyon Operations' },
  { trip_id: 'TRP-004', asset_id: 'AST-004', asset_name: 'VAN-0891', driver_id: 'DRV-004', driver_name: 'Erik Larsen', start_time: '2024-12-23 08:00', end_time: '2024-12-23 16:30', start_location: 'Berlin Hub', end_location: 'Multiple Stops', start_address: 'Logistikzentrum, 10115 Berlin', end_address: 'Berlin City Area', distance: 156, duration: 510, max_speed: 65, avg_speed: 32, idle_time: 95, fuel_consumed: 34, tag_id: 'TAG-003', tags: 'Berlin Hub' },
  { trip_id: 'TRP-005', asset_id: 'AST-005', asset_name: 'TRK-6234', driver_id: 'DRV-005', driver_name: 'Priya Sharma', start_time: '2024-12-23 04:30', end_time: '2024-12-23 15:00', start_location: 'Paris South', end_location: 'Brussels Terminal', start_address: 'Zone Sud, 94000 Créteil', end_address: 'Port de Bruxelles, 1000 Brussels', distance: 312, duration: 630, max_speed: 94, avg_speed: 68, idle_time: 45, fuel_consumed: 105, tag_id: 'TAG-001', tags: 'Paris Fleet' },
  { trip_id: 'TRP-006', asset_id: 'AST-006', asset_name: 'TRK-7891', driver_id: 'DRV-006', driver_name: 'Luca Rossi', start_time: '2024-12-23 06:00', end_time: '2024-12-23 13:15', start_location: 'London Depot', end_location: 'Birmingham Hub', start_address: 'Industrial Estate, E14 London', end_address: 'Logistics Park, B1 Birmingham', distance: 198, duration: 435, max_speed: 88, avg_speed: 62, idle_time: 55, fuel_consumed: 67, tag_id: 'TAG-005', tags: 'London Metro' },
];

// Safety Events Mock Data
const mockSafetyEventsData = [
  { event_id: 'EVT-001', event_type: 'Harsh Braking', behavior: 'Hard Stop', driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', asset_id: 'AST-002', asset_name: 'TRK-1923', trip_id: 'TRP-002', timestamp: '2024-12-23 08:45', location: 'A7 Highway, Hamburg', severity: 'Medium', g_force: 0.45, speed: 82, speed_limit: 80, coaching_status: 'Needs Review', coached_by: null, coached_date: null, has_video: true, tag_id: 'TAG-004' },
  { event_id: 'EVT-002', event_type: 'Speeding', behavior: 'Over Speed Limit', driver_id: 'DRV-004', driver_name: 'Erik Larsen', asset_id: 'AST-004', asset_name: 'VAN-0891', trip_id: 'TRP-004', timestamp: '2024-12-23 10:22', location: 'Berlin Ring Road', severity: 'Low', g_force: 0, speed: 68, speed_limit: 50, coaching_status: 'Coached', coached_by: 'Klaus Weber', coached_date: '2024-12-23', has_video: false, tag_id: 'TAG-003' },
  { event_id: 'EVT-003', event_type: 'Distracted Driving', behavior: 'Phone Use', driver_id: 'DRV-008', driver_name: 'Hans Mueller', asset_id: 'AST-008', asset_name: 'TRK-5567', trip_id: null, timestamp: '2024-12-23 09:15', location: 'Hamburg Port Area', severity: 'High', g_force: 0, speed: 35, speed_limit: 30, coaching_status: 'Needs Coaching', coached_by: null, coached_date: null, has_video: true, tag_id: 'TAG-004' },
  { event_id: 'EVT-004', event_type: 'Harsh Acceleration', behavior: 'Rapid Start', driver_id: 'DRV-006', driver_name: 'Luca Rossi', asset_id: 'AST-006', asset_name: 'TRK-7891', trip_id: 'TRP-006', timestamp: '2024-12-23 07:30', location: 'M25 Junction 15', severity: 'Low', g_force: 0.38, speed: 45, speed_limit: 70, coaching_status: 'Dismissed', coached_by: 'James Wilson', coached_date: '2024-12-23', has_video: true, tag_id: 'TAG-005' },
  { event_id: 'EVT-005', event_type: 'Close Following', behavior: 'Tailgating', driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', asset_id: 'AST-002', asset_name: 'TRK-1923', trip_id: 'TRP-002', timestamp: '2024-12-23 09:55', location: 'A24 Highway', severity: 'High', g_force: 0, speed: 88, speed_limit: 100, coaching_status: 'Needs Review', coached_by: null, coached_date: null, has_video: true, tag_id: 'TAG-004' },
  { event_id: 'EVT-006', event_type: 'Lane Departure', behavior: 'Unintentional Lane Change', driver_id: 'DRV-005', driver_name: 'Priya Sharma', asset_id: 'AST-005', asset_name: 'TRK-6234', trip_id: 'TRP-005', timestamp: '2024-12-23 12:40', location: 'E19 Belgium Border', severity: 'Medium', g_force: 0.22, speed: 78, speed_limit: 120, coaching_status: 'Coached', coached_by: 'Sophie Martin', coached_date: '2024-12-23', has_video: true, tag_id: 'TAG-001' },
];

// Fuel Mock Data
const mockFuelData = [
  { asset_id: 'AST-001', asset_name: 'TRK-2847', driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', trip_id: 'TRP-001', date: '2024-12-23', fuel_consumed: 78, distance: 245, efficiency: 31.8, idle_fuel: 4.2, fuel_cost: 124.80, fuel_type: 'Diesel', co2_emissions: 205, fill_ups: 1, tag_id: 'TAG-001' },
  { asset_id: 'AST-002', asset_name: 'TRK-1923', driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', trip_id: 'TRP-002', date: '2024-12-23', fuel_consumed: 92, distance: 289, efficiency: 31.8, idle_fuel: 3.8, fuel_cost: 147.20, fuel_type: 'Diesel', co2_emissions: 242, fill_ups: 1, tag_id: 'TAG-004' },
  { asset_id: 'AST-003', asset_name: 'TRK-4472', driver_id: 'DRV-003', driver_name: 'Marie Dubois', trip_id: 'TRP-003', date: '2024-12-23', fuel_consumed: 98, distance: 315, efficiency: 31.1, idle_fuel: 2.1, fuel_cost: 156.80, fuel_type: 'Diesel', co2_emissions: 258, fill_ups: 1, tag_id: 'TAG-002' },
  { asset_id: 'AST-004', asset_name: 'VAN-0891', driver_id: 'DRV-004', driver_name: 'Erik Larsen', trip_id: 'TRP-004', date: '2024-12-23', fuel_consumed: 34, distance: 156, efficiency: 21.8, idle_fuel: 8.5, fuel_cost: 54.40, fuel_type: 'Diesel', co2_emissions: 89, fill_ups: 0, tag_id: 'TAG-003' },
  { asset_id: 'AST-005', asset_name: 'TRK-6234', driver_id: 'DRV-005', driver_name: 'Priya Sharma', trip_id: 'TRP-005', date: '2024-12-23', fuel_consumed: 105, distance: 312, efficiency: 33.7, idle_fuel: 5.6, fuel_cost: 168.00, fuel_type: 'Diesel', co2_emissions: 276, fill_ups: 1, tag_id: 'TAG-001' },
  { asset_id: 'AST-006', asset_name: 'TRK-7891', driver_id: 'DRV-006', driver_name: 'Luca Rossi', trip_id: 'TRP-006', date: '2024-12-23', fuel_consumed: 67, distance: 198, efficiency: 33.8, idle_fuel: 6.2, fuel_cost: 107.20, fuel_type: 'Diesel', co2_emissions: 176, fill_ups: 0, tag_id: 'TAG-005' },
];

// HOS Mock Data
const mockHOSData = [
  { driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', asset_id: 'AST-001', asset_name: 'TRK-2847', date: '2024-12-23', driving_time: 495, on_duty_time: 540, off_duty_time: 420, sleeper_time: 480, available_time: 150, break_time: 45, violations: 0, violation_type: null, violation_severity: null, certification_status: 'Certified', eld_mode: 'Driving', tag_id: 'TAG-001' },
  { driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', asset_id: 'AST-002', asset_name: 'TRK-1923', date: '2024-12-23', driving_time: 390, on_duty_time: 450, off_duty_time: 540, sleeper_time: 420, available_time: 255, break_time: 30, violations: 1, violation_type: 'Daily Driving Exceeded', violation_severity: 'Minor', certification_status: 'Certified', eld_mode: 'Rest', tag_id: 'TAG-004' },
  { driver_id: 'DRV-003', driver_name: 'Marie Dubois', asset_id: 'AST-003', asset_name: 'TRK-4472', date: '2024-12-23', driving_time: 285, on_duty_time: 330, off_duty_time: 660, sleeper_time: 450, available_time: 360, break_time: 45, violations: 0, violation_type: null, violation_severity: null, certification_status: 'Certified', eld_mode: 'Available', tag_id: 'TAG-002' },
  { driver_id: 'DRV-004', driver_name: 'Erik Larsen', asset_id: 'AST-004', asset_name: 'VAN-0891', date: '2024-12-23', driving_time: 510, on_duty_time: 600, off_duty_time: 360, sleeper_time: 480, available_time: 45, break_time: 30, violations: 2, violation_type: 'Insufficient Break', violation_severity: 'Serious', certification_status: 'Pending', eld_mode: 'Driving', tag_id: 'TAG-003' },
  { driver_id: 'DRV-005', driver_name: 'Priya Sharma', asset_id: 'AST-005', asset_name: 'TRK-6234', date: '2024-12-23', driving_time: 630, on_duty_time: 690, off_duty_time: 270, sleeper_time: 480, available_time: 15, break_time: 45, violations: 0, violation_type: null, violation_severity: null, certification_status: 'Certified', eld_mode: 'Driving', tag_id: 'TAG-001' },
  { driver_id: 'DRV-006', driver_name: 'Luca Rossi', asset_id: 'AST-006', asset_name: 'TRK-7891', date: '2024-12-23', driving_time: 435, on_duty_time: 510, off_duty_time: 450, sleeper_time: 480, available_time: 210, break_time: 45, violations: 1, violation_type: 'Weekly Rest Short', violation_severity: 'Minor', certification_status: 'Certified', eld_mode: 'Off Duty', tag_id: 'TAG-005' },
];

// DVIR Mock Data
const mockDVIRData = [
  { inspection_id: 'INS-001', asset_id: 'AST-001', asset_name: 'TRK-2847', driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', inspection_type: 'Pre-Trip', timestamp: '2024-12-23 06:00', status: 'Safe', defects_count: 0, defect_category: null, defect_details: null, is_safe: true, mechanic: null, resolution_date: null, resolution_notes: null, tag_id: 'TAG-001' },
  { inspection_id: 'INS-002', asset_id: 'AST-002', asset_name: 'TRK-1923', driver_id: 'DRV-002', driver_name: 'Klaus Schmidt', inspection_type: 'Pre-Trip', timestamp: '2024-12-23 04:30', status: 'Defects Found', defects_count: 2, defect_category: 'Lights', defect_details: 'Right rear light flickering, Left indicator dim', is_safe: true, mechanic: 'Peter Braun', resolution_date: '2024-12-23', resolution_notes: 'Bulbs replaced', tag_id: 'TAG-004' },
  { inspection_id: 'INS-003', asset_id: 'AST-003', asset_name: 'TRK-4472', driver_id: 'DRV-003', driver_name: 'Marie Dubois', inspection_type: 'Pre-Trip', timestamp: '2024-12-23 07:00', status: 'Safe', defects_count: 0, defect_category: null, defect_details: null, is_safe: true, mechanic: null, resolution_date: null, resolution_notes: null, tag_id: 'TAG-002' },
  { inspection_id: 'INS-004', asset_id: 'AST-004', asset_name: 'VAN-0891', driver_id: 'DRV-004', driver_name: 'Erik Larsen', inspection_type: 'Pre-Trip', timestamp: '2024-12-23 07:45', status: 'Defects Found', defects_count: 1, defect_category: 'Tires', defect_details: 'Front left tire pressure low', is_safe: true, mechanic: 'Max Fischer', resolution_date: '2024-12-23', resolution_notes: 'Tire inflated to correct pressure', tag_id: 'TAG-003' },
  { inspection_id: 'INS-005', asset_id: 'AST-005', asset_name: 'TRK-6234', driver_id: 'DRV-005', driver_name: 'Priya Sharma', inspection_type: 'Pre-Trip', timestamp: '2024-12-23 04:15', status: 'Unsafe', defects_count: 3, defect_category: 'Brakes', defect_details: 'Brake pad wear critical, ABS warning light, Parking brake weak', is_safe: false, mechanic: 'Jean Lefebvre', resolution_date: '2024-12-23', resolution_notes: 'Brake pads replaced, ABS sensor fixed, parking brake adjusted', tag_id: 'TAG-001' },
  { inspection_id: 'INS-006', asset_id: 'AST-001', asset_name: 'TRK-2847', driver_id: 'DRV-001', driver_name: 'Jean-Pierre Moreau', inspection_type: 'Post-Trip', timestamp: '2024-12-23 15:00', status: 'Safe', defects_count: 0, defect_category: null, defect_details: null, is_safe: true, mechanic: null, resolution_date: null, resolution_notes: null, tag_id: 'TAG-001' },
];

// Map dataset IDs to mock data
const mockDataByDataset = {
  organization: mockOrganizationData,
  assets: mockAssetsData,
  drivers: mockDriversData,
  trips: mockTripsData,
  safety_events: mockSafetyEventsData,
  fuel: mockFuelData,
  hos: mockHOSData,
  dvir: mockDVIRData,
};

// Function to generate mock data for a report based on selected fields
const generateReportData = (primaryDataset, mergedDatasets, selectedFields, filters) => {
  // Get primary data
  let data = [...(mockDataByDataset[primaryDataset.id] || [])];
  
  // If we have merged datasets, join the data
  if (mergedDatasets && mergedDatasets.length > 0) {
    data = data.map(row => {
      const enrichedRow = { ...row };
      
      mergedDatasets.forEach(mergedDs => {
        const mergedData = mockDataByDataset[mergedDs.id] || [];
        
        // Try to find matching record based on common keys
        let matchedRecord = null;
        
        // Match by driver_id
        if (row.driver_id && mergedData[0]?.driver_id) {
          matchedRecord = mergedData.find(m => m.driver_id === row.driver_id);
        }
        // Match by asset_id
        else if (row.asset_id && mergedData[0]?.asset_id) {
          matchedRecord = mergedData.find(m => m.asset_id === row.asset_id);
        }
        // Match by tag_id
        else if (row.tag_id && mergedData[0]?.tag_id) {
          matchedRecord = mergedData.find(m => m.tag_id === row.tag_id);
        }
        
        if (matchedRecord) {
          // Add fields from merged dataset with prefix
          Object.keys(matchedRecord).forEach(key => {
            if (!enrichedRow.hasOwnProperty(key)) {
              enrichedRow[`${mergedDs.id}_${key}`] = matchedRecord[key];
            }
          });
        }
      });
      
      return enrichedRow;
    });
  }
  
  // Apply filters
  if (filters && filters.length > 0) {
    filters.forEach(filter => {
      if (filter.value) {
        data = data.filter(row => {
          const value = row[filter.field];
          if (value === undefined || value === null) return false;
          
          const strValue = String(value).toLowerCase();
          const filterValue = filter.value.toLowerCase();
          
          switch (filter.operator) {
            case 'equals':
              return strValue === filterValue;
            case 'contains':
              return strValue.includes(filterValue);
            case 'greater_than':
              return parseFloat(value) > parseFloat(filter.value);
            case 'less_than':
              return parseFloat(value) < parseFloat(filter.value);
            case 'is_empty':
              return !value || value === '';
            default:
              return true;
          }
        });
      }
    });
  }
  
  // Project only selected fields
  return data.map(row => {
    const projectedRow = {};
    selectedFields.forEach(field => {
      // Try direct field name
      if (row.hasOwnProperty(field.id)) {
        projectedRow[field.customName] = row[field.id];
      }
      // Try with dataset prefix for merged fields
      else if (row.hasOwnProperty(`${field.sourceDataset}_${field.id}`)) {
        projectedRow[field.customName] = row[`${field.sourceDataset}_${field.id}`];
      }
      // Check original field name
      else {
        const originalField = Object.keys(row).find(k => k.endsWith(field.id));
        if (originalField) {
          projectedRow[field.customName] = row[originalField];
        } else {
          projectedRow[field.customName] = '-';
        }
      }
    });
    return projectedRow;
  });
};

// Filter Context for persistence across pages
const FilterContext = createContext();
const useFilters = () => useContext(FilterContext);

// Hierarchical organization structure: Region > Branch > Team
const orgHierarchy = [
  {
    id: 'region-eu',
    name: 'Europe',
    type: 'region',
    icon: '🇪🇺',
    children: [
      {
        id: 'branch-fr',
        name: 'France',
        type: 'branch',
        icon: '🇫🇷',
        children: [
          { id: 'team-paris', name: 'Paris Fleet', type: 'team', vehicleCount: 12, driverCount: 18 },
          { id: 'team-lyon', name: 'Lyon Operations', type: 'team', vehicleCount: 8, driverCount: 11 },
          { id: 'team-marseille', name: 'Marseille Port', type: 'team', vehicleCount: 15, driverCount: 22 },
        ]
      },
      {
        id: 'branch-de',
        name: 'Germany',
        type: 'branch',
        icon: '🇩🇪',
        children: [
          { id: 'team-berlin', name: 'Berlin Hub', type: 'team', vehicleCount: 10, driverCount: 14 },
          { id: 'team-munich', name: 'Munich Logistics', type: 'team', vehicleCount: 7, driverCount: 9 },
          { id: 'team-hamburg', name: 'Hamburg Port', type: 'team', vehicleCount: 18, driverCount: 25 },
        ]
      },
      {
        id: 'branch-nl',
        name: 'Netherlands',
        type: 'branch',
        icon: '🇳🇱',
        children: [
          { id: 'team-rotterdam', name: 'Rotterdam Terminal', type: 'team', vehicleCount: 22, driverCount: 30 },
          { id: 'team-amsterdam', name: 'Amsterdam Distribution', type: 'team', vehicleCount: 6, driverCount: 8 },
        ]
      },
    ]
  },
  {
    id: 'region-uk',
    name: 'United Kingdom',
    type: 'region',
    icon: '🇬🇧',
    children: [
      {
        id: 'branch-england',
        name: 'England',
        type: 'branch',
        icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        children: [
          { id: 'team-london', name: 'London Metro', type: 'team', vehicleCount: 14, driverCount: 20 },
          { id: 'team-birmingham', name: 'Birmingham Depot', type: 'team', vehicleCount: 9, driverCount: 12 },
          { id: 'team-manchester', name: 'Manchester North', type: 'team', vehicleCount: 11, driverCount: 15 },
        ]
      },
      {
        id: 'branch-scotland',
        name: 'Scotland',
        type: 'branch',
        icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
        children: [
          { id: 'team-edinburgh', name: 'Edinburgh Fleet', type: 'team', vehicleCount: 5, driverCount: 7 },
          { id: 'team-glasgow', name: 'Glasgow Operations', type: 'team', vehicleCount: 8, driverCount: 10 },
        ]
      },
    ]
  },
];

const vehicles = [
  { id: 'BC17VCF', speed: 21, location: 'Balls Pond Road, London Borough of Islington, England', driver: 'PASSFIELD RICKY', status: 'moving' },
  { id: 'BK68LHT', speed: 47, location: 'North Circular Road, London Borough of Barnet, England', driver: 'RYAN JAMIE LEE', status: 'moving' },
  { id: 'LB68FZS', speed: 47, location: 'Rushmoor, England', driver: 'STOKES CHRISTOPHER', status: 'moving' },
  { id: 'WV67AFY', speed: 15, location: 'England', driver: 'STRANG SCOTT GRAHAM', status: 'moving' },
  { id: '121642', speed: 0, location: 'England', driver: null, status: 'stopped' },
  { id: '23192', speed: 0, location: '239063', driver: null, status: 'stopped' },
  { id: 'TRK-2847', speed: 82, location: 'A1 Motorway, near Lille, France', driver: 'MOREAU JEAN-PIERRE', status: 'moving' },
  { id: 'TRK-1923', speed: 0, location: 'Hamburg Port Terminal, Germany', driver: 'SCHMIDT KLAUS', status: 'stopped' },
];

const drivers = [
  { id: 'd-001', name: 'Jean-Pierre Moreau', status: 'driving', hoursRemaining: 2.5, vehicle: 'TRK-2847' },
  { id: 'd-002', name: 'Klaus Schmidt', status: 'rest', hoursRemaining: 9, vehicle: 'TRK-1923' },
  { id: 'd-003', name: 'Marie Dubois', status: 'driving', hoursRemaining: 4.2, vehicle: 'TRK-4472' },
  { id: 'd-004', name: 'Erik Larsen', status: 'available', hoursRemaining: 9, vehicle: 'VAN-0891' },
  { id: 'd-005', name: 'Priya Sharma', status: 'driving', hoursRemaining: 1.8, vehicle: 'TRK-6234' },
  { id: 'd-006', name: 'Luca Rossi', status: 'break', hoursRemaining: 6.5, vehicle: 'TRK-7891' },
];

const complianceData = [
  { week: 'W47', violations: 3, warnings: 8, clean: 89 },
  { week: 'W48', violations: 2, warnings: 5, clean: 93 },
  { week: 'W49', violations: 4, warnings: 7, clean: 89 },
  { week: 'W50', violations: 1, warnings: 4, clean: 95 },
  { week: 'W51', violations: 2, warnings: 6, clean: 92 },
  { week: 'W52', violations: 0, warnings: 3, clean: 97 },
];

const fuelData = [
  { day: 'Mon', consumption: 2840, cost: 3124 },
  { day: 'Tue', consumption: 3120, cost: 3432 },
  { day: 'Wed', consumption: 2950, cost: 3245 },
  { day: 'Thu', consumption: 3280, cost: 3608 },
  { day: 'Fri', consumption: 3450, cost: 3795 },
  { day: 'Sat', consumption: 1890, cost: 2079 },
  { day: 'Sun', consumption: 980, cost: 1078 },
];

const recentInfringements = [
  { id: 1, driver: 'Jean-Pierre Moreau', type: 'Exceeded daily driving (9h47m)', severity: 'minor', time: '2h ago', regulation: 'EU 561/2006 Art.6' },
  { id: 2, driver: 'Priya Sharma', type: 'Insufficient daily rest (10h12m)', severity: 'serious', time: '5h ago', regulation: 'EU 561/2006 Art.8' },
  { id: 3, driver: 'Klaus Schmidt', type: 'Break not taken within 4.5h', severity: 'minor', time: '1d ago', regulation: 'EU 561/2006 Art.7' },
];

// Data availability
const dataAvailability = {
  days: new Set([
    '2024-12-22', '2024-12-21', '2024-12-20', '2024-12-19', '2024-12-18', 
    '2024-12-17', '2024-12-16', '2024-12-15', '2024-12-14', '2024-12-13',
    '2024-12-12', '2024-12-11', '2024-12-10', '2024-12-09', '2024-12-08',
    '2024-12-06', '2024-12-05', '2024-12-04', '2024-12-03', '2024-12-02',
    '2024-11-29', '2024-11-28', '2024-11-27', '2024-11-26', '2024-11-25',
  ]),
  months: new Set(['2024-12', '2024-11', '2024-10', '2024-09', '2024-08']),
  weeks: new Set(['2024-51', '2024-50', '2024-49', '2024-48', '2024-47', '2024-46']),
};

const hasDataForDay = (date) => {
  const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  return dataAvailability.days.has(key);
};

const hasDataForMonth = (year, month) => {
  const key = `${year}-${String(month + 1).padStart(2, '0')}`;
  return dataAvailability.months.has(key);
};

const hasDataForWeek = (year, weekNum) => {
  const key = `${year}-${String(weekNum).padStart(2, '0')}`;
  return dataAvailability.weeks.has(key);
};

// Filter Provider
const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    organization: {
      region: orgHierarchy[0],
      branch: orgHierarchy[0].children[0],
      team: orgHierarchy[0].children[0].children[0],
      level: 'team',
    },
    selectedVehicles: [],
    selectedDrivers: [],
    dateRange: {
      type: 'week',
      start: new Date(2024, 11, 16),
      end: new Date(2024, 11, 22),
    }
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

// Dropdown Button Component (Fleet style)
const DropdownButton = ({ children, icon: Icon, onClick, active }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-md transition-colors ${
      active 
        ? 'bg-gray-100 border-gray-300 text-gray-900' 
        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
    }`}
  >
    {Icon && <Icon size={14} />}
    {children}
    <ChevronDown size={14} className="text-gray-400" />
  </button>
);

// Organization Selector (Hierarchical)
const OrganizationSelector = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRegions, setExpandedRegions] = useState(new Set([selected.region?.id]));
  const [expandedBranches, setExpandedBranches] = useState(new Set([selected.branch?.id]));
  
  const toggleRegion = (regionId) => {
    const newExpanded = new Set(expandedRegions);
    if (newExpanded.has(regionId)) newExpanded.delete(regionId);
    else newExpanded.add(regionId);
    setExpandedRegions(newExpanded);
  };
  
  const toggleBranch = (branchId) => {
    const newExpanded = new Set(expandedBranches);
    if (newExpanded.has(branchId)) newExpanded.delete(branchId);
    else newExpanded.add(branchId);
    setExpandedBranches(newExpanded);
  };
  
  const selectLevel = (region, branch = null, team = null) => {
    const level = team ? 'team' : branch ? 'branch' : 'region';
    onChange({ region, branch, team, level });
    setIsOpen(false);
  };
  
  const getDisplayName = () => {
    if (selected.level === 'team') return selected.team?.name;
    if (selected.level === 'branch') return selected.branch?.name;
    return selected.region?.name;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        <Building2 size={14} className="text-gray-500" />
        <span className="font-medium text-gray-700">{getDisplayName()}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[280px] max-h-[360px] overflow-auto">
            <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Organization</span>
            </div>
            
            <div className="py-1">
              {orgHierarchy.map(region => (
                <div key={region.id}>
                  <div className="flex items-center hover:bg-gray-50">
                    <button onClick={() => toggleRegion(region.id)} className="p-2 text-gray-400 hover:text-gray-600">
                      <ChevronRight size={14} className={`transition-transform ${expandedRegions.has(region.id) ? 'rotate-90' : ''}`} />
                    </button>
                    <button
                      onClick={() => selectLevel(region)}
                      className={`flex-1 flex items-center gap-2 px-2 py-1.5 text-left ${
                        selected.level === 'region' && selected.region?.id === region.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <span>{region.icon}</span>
                      <span className="font-medium">{region.name}</span>
                    </button>
                  </div>
                  
                  {expandedRegions.has(region.id) && region.children.map(branch => (
                    <div key={branch.id} className="ml-4">
                      <div className="flex items-center hover:bg-gray-50">
                        <button onClick={() => toggleBranch(branch.id)} className="p-2 text-gray-400 hover:text-gray-600">
                          <ChevronRight size={14} className={`transition-transform ${expandedBranches.has(branch.id) ? 'rotate-90' : ''}`} />
                        </button>
                        <button
                          onClick={() => selectLevel(region, branch)}
                          className={`flex-1 flex items-center gap-2 px-2 py-1.5 text-left text-sm ${
                            selected.level === 'branch' && selected.branch?.id === branch.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600'
                          }`}
                        >
                          <span>{branch.icon}</span>
                          <span>{branch.name}</span>
                        </button>
                      </div>
                      
                      {expandedBranches.has(branch.id) && branch.children.map(team => (
                        <button
                          key={team.id}
                          onClick={() => selectLevel(region, branch, team)}
                          className={`w-full flex items-center gap-2 pl-12 pr-3 py-1.5 text-left text-sm hover:bg-gray-50 ${
                            selected.level === 'team' && selected.team?.id === team.id ? 'bg-blue-50 text-blue-700' : 'text-gray-500'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                          <span>{team.name}</span>
                          <span className="ml-auto text-xs text-gray-400">{team.vehicleCount}v · {team.driverCount}d</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Date Range Picker
const DateRangePicker = ({ dateRange, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');
  const [selectedMonth, setSelectedMonth] = useState(11);
  const [selectedYear, setSelectedYear] = useState(2024);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2023, 2024, 2025];
  
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };
  
  const formatDisplay = () => {
    if (dateRange.type === 'month') {
      return dateRange.start.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    }
    if (dateRange.type === 'week') {
      return `W${getWeekNumber(dateRange.start)} ${dateRange.start.getFullYear()}`;
    }
    const formatDate = (d) => d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    return `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`;
  };
  
  const getWeeksInMonth = (year, month) => {
    const weeks = [];
    let currentDate = new Date(year, month, 1);
    const dayOfWeek = currentDate.getDay();
    currentDate.setDate(currentDate.getDate() - ((dayOfWeek + 6) % 7));
    
    for (let i = 0; i < 6; i++) {
      const weekStart = new Date(currentDate);
      const weekEnd = new Date(currentDate);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weeks.push({
        number: getWeekNumber(weekStart),
        start: weekStart,
        end: weekEnd,
      });
      currentDate.setDate(currentDate.getDate() + 7);
    }
    return weeks;
  };
  
  const getDaysInMonth = (year, month) => {
    const days = [];
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const setQuickPreset = (preset) => {
    const now = new Date(2024, 11, 22);
    let start, end, type;
    
    switch(preset) {
      case 'today': start = end = new Date(now); type = 'day'; break;
      case 'yesterday': start = end = new Date(now.setDate(now.getDate() - 1)); type = 'day'; break;
      case 'last7': start = new Date(2024, 11, 16); end = new Date(2024, 11, 22); type = 'days'; break;
      case 'last30': start = new Date(2024, 10, 23); end = new Date(2024, 11, 22); type = 'days'; break;
      case 'thisMonth': start = new Date(2024, 11, 1); end = new Date(2024, 11, 22); type = 'month'; break;
      case 'lastMonth': start = new Date(2024, 10, 1); end = new Date(2024, 10, 30); type = 'month'; break;
      default: return;
    }
    onChange({ type, start, end });
    setIsOpen(false);
  };

  const weeks = getWeeksInMonth(selectedYear, selectedMonth);
  const days = getDaysInMonth(selectedYear, selectedMonth);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
      >
        <Calendar size={14} className="text-gray-500" />
        <span className="text-gray-700">{formatDisplay()}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[300px]">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'quick', label: 'Quick' },
                { id: 'month', label: 'Month' },
                { id: 'week', label: 'Week' },
                { id: 'day', label: 'Day' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'text-blue-600 border-b-2 border-blue-600 -mb-px' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-3">
              {/* Legend */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 pb-2 border-b border-gray-100">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Data available</span>
              </div>
              
              {activeTab === 'quick' && (
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { id: 'today', label: 'Today' },
                    { id: 'yesterday', label: 'Yesterday' },
                    { id: 'last7', label: 'Last 7 days' },
                    { id: 'last30', label: 'Last 30 days' },
                    { id: 'thisMonth', label: 'This month' },
                    { id: 'lastMonth', label: 'Last month' },
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => setQuickPreset(preset.id)}
                      className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded text-left"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
              
              {activeTab === 'month' && (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-3 py-1 text-sm rounded ${
                          selectedYear === year ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {months.map((month, idx) => {
                      const hasData = hasDataForMonth(selectedYear, idx);
                      return (
                        <button
                          key={month}
                          onClick={() => {
                            onChange({ type: 'month', start: new Date(selectedYear, idx, 1), end: new Date(selectedYear, idx + 1, 0) });
                            setIsOpen(false);
                          }}
                          className={`relative px-2 py-2 text-sm rounded ${
                            hasData ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'
                          }`}
                        >
                          {month}
                          {hasData && <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activeTab === 'week' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={() => setSelectedMonth(m => m === 0 ? 11 : m - 1)} className="p-1 text-gray-400 hover:text-gray-600">
                      <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">{months[selectedMonth]} {selectedYear}</span>
                    <button onClick={() => setSelectedMonth(m => m === 11 ? 0 : m + 1)} className="p-1 text-gray-400 hover:text-gray-600">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {weeks.map(week => {
                      const hasData = hasDataForWeek(week.start.getFullYear(), week.number);
                      return (
                        <button
                          key={week.number}
                          onClick={() => { onChange({ type: 'week', start: week.start, end: week.end }); setIsOpen(false); }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm ${
                            hasData ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300'
                          }`}
                        >
                          <span className="w-8 text-xs text-gray-400">W{week.number}</span>
                          <span>{week.start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - {week.end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                          {hasData && <span className="ml-auto w-1.5 h-1.5 bg-blue-500 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {activeTab === 'day' && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={() => setSelectedMonth(m => m === 0 ? 11 : m - 1)} className="p-1 text-gray-400 hover:text-gray-600">
                      <ChevronRight size={16} className="rotate-180" />
                    </button>
                    <span className="text-sm font-medium text-gray-700">{months[selectedMonth]} {selectedYear}</span>
                    <button onClick={() => setSelectedMonth(m => m === 11 ? 0 : m + 1)} className="p-1 text-gray-400 hover:text-gray-600">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-1">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                      <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: (new Date(selectedYear, selectedMonth, 1).getDay() + 6) % 7 }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {days.map(day => {
                      const hasData = hasDataForDay(day);
                      const isToday = day.getDate() === 22 && day.getMonth() === 11;
                      return (
                        <button
                          key={day.getDate()}
                          onClick={() => { onChange({ type: 'day', start: day, end: day }); setIsOpen(false); }}
                          className={`relative w-8 h-8 text-sm rounded ${
                            isToday ? 'bg-blue-100 text-blue-700 font-medium' :
                            hasData ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'
                          }`}
                        >
                          {day.getDate()}
                          {hasData && !isToday && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Multi-Select Filter
const MultiSelectFilter = ({ label, icon: Icon, items, selectedIds, onChange, idKey = 'id', displayKey = 'name' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleItem = (id) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(i => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border rounded-md transition-colors ${
          selectedIds.length > 0 
            ? 'bg-blue-50 border-blue-200 text-blue-700' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
      >
        {Icon && <Icon size={14} />}
        {selectedIds.length > 0 ? `${selectedIds.length} ${label}` : label}
        <ChevronDown size={14} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-[200px] max-h-[300px] overflow-auto">
            <div className="p-2 border-b border-gray-100">
              <button onClick={() => onChange([])} className="text-xs text-blue-600 hover:text-blue-700">
                Clear all
              </button>
            </div>
            {items.map(item => (
              <label key={item[idKey]} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item[idKey])}
                  onChange={() => toggleItem(item[idKey])}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{item[displayKey]}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Narrow Icon Sidebar (Fleet style)
const IconSidebar = ({ activePage, setActivePage }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'fleet', icon: Truck, label: 'Fleet' },
    { id: 'safety', icon: Shield, label: 'Safety' },
    { id: 'compliance', icon: FileCheck, label: 'Compliance' },
    { id: 'routes', icon: Route, label: 'Routes' },
    { id: 'fuel', icon: Fuel, label: 'Fuel' },
    { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
  ];
  
  const bottomItems = [
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
    { id: 'alerts', icon: Bell, label: 'Alerts' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];
  
  return (
    <div className="w-14 bg-white border-r border-gray-200 flex flex-col items-center py-3 shrink-0">
      {/* Logo */}
      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6">
        <Truck size={18} className="text-white" />
      </div>
      
      {/* Main Nav */}
      <nav className="flex-1 flex flex-col items-center gap-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            title={item.label}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              activePage === item.id
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
          </button>
        ))}
      </nav>
      
      {/* Bottom Nav */}
      <div className="flex flex-col items-center gap-1 pt-4 border-t border-gray-100">
        {bottomItems.map(item => (
          <button
            key={item.id}
            title={item.label}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <item.icon size={20} />
          </button>
        ))}
        
        {/* User Avatar */}
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mt-2">
          M
        </div>
      </div>
    </div>
  );
};

// Filter Header Bar
const FilterHeader = () => {
  const { filters, setFilters } = useFilters();
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 sticky top-0 z-20">
      <OrganizationSelector
        selected={filters.organization}
        onChange={(org) => setFilters(f => ({ ...f, organization: org }))}
      />
      
      <div className="w-px h-6 bg-gray-200" />
      
      <MultiSelectFilter
        label="Vehicles"
        icon={Truck}
        items={vehicles}
        selectedIds={filters.selectedVehicles}
        onChange={(ids) => setFilters(f => ({ ...f, selectedVehicles: ids }))}
        idKey="id"
        displayKey="id"
      />
      
      <MultiSelectFilter
        label="Drivers"
        icon={Users}
        items={drivers}
        selectedIds={filters.selectedDrivers}
        onChange={(ids) => setFilters(f => ({ ...f, selectedDrivers: ids }))}
      />
      
      <DateRangePicker
        dateRange={filters.dateRange}
        onChange={(range) => setFilters(f => ({ ...f, dateRange: range }))}
      />
      
      {(filters.selectedVehicles.length > 0 || filters.selectedDrivers.length > 0) && (
        <button
          onClick={() => setFilters(f => ({ ...f, selectedVehicles: [], selectedDrivers: [] }))}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <X size={12} />
          Clear filters
        </button>
      )}
    </div>
  );
};

// Stat Card (Light theme)
const StatCard = ({ title, value, subtitle, icon: Icon, trend, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
          {Math.abs(trend)}% vs last period
        </div>
      )}
    </div>
  );
};

// Vehicle List Panel (Fleet style)
const VehicleListPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredVehicles = vehicles.filter(v => 
    v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (v.driver && v.driver.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
      {/* Search */}
      <div className="p-3 border-b border-gray-100">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${vehicles.length} vehicles`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Filter buttons */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-gray-100">
        <DropdownButton>Tags</DropdownButton>
        <DropdownButton>More</DropdownButton>
        <div className="flex-1" />
        <DropdownButton icon={ArrowUpDown}>Sort</DropdownButton>
      </div>
      
      {/* Vehicle list */}
      <div className="flex-1 overflow-auto">
        {filteredVehicles.map(vehicle => (
          <div 
            key={vehicle.id} 
            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-1">
              <span className="font-semibold text-gray-900">{vehicle.id}</span>
              <span className="text-sm text-gray-500">{vehicle.speed} mph</span>
            </div>
            <div className="flex items-start gap-1.5 text-sm text-gray-500 mb-1">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${vehicle.status === 'moving' ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="line-clamp-2">{vehicle.location}</span>
            </div>
            {vehicle.driver && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <User size={12} />
                <span className="font-medium">{vehicle.driver}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Standard Reports Data - Based on Fleet's actual report catalog
const standardReports = [
  // Activity Reports
  { id: 'activity-report', name: 'Activity Report', description: 'Drive time, stops, and odometer readings for vehicles and drivers', category: 'Activity', lastRun: '2h ago' },
  { id: 'trip-history', name: 'Trip History Report', description: 'Vehicle trips with start/end location, driver, distance, and speeding summaries', category: 'Activity', lastRun: '1h ago' },
  { id: 'start-stop', name: 'Start / Stop Report', description: 'Trip statistics, route compliance, and distance by driver', category: 'Activity', lastRun: '3h ago' },
  { id: 'privacy-sessions', name: 'Privacy Sessions Report', description: 'Privacy button usage, session frequency, and distance under privacy mode', category: 'Activity', lastRun: '1d ago' },
  { id: 'time-on-site', name: 'Time on Site Report', description: 'Detention times and visits within geofences', category: 'Activity', lastRun: '4h ago' },
  { id: 'co-location', name: 'Co-Location Report', description: 'Supervisor engagement with crews within geofenced areas', category: 'Activity', lastRun: '1d ago' },
  { id: 'timesheet', name: 'Timesheet Report', description: 'Driver working hours by shift from live tachograph statistics', category: 'Activity', lastRun: '30m ago', region: 'EU' },
  
  // Asset Reports
  { id: 'equipment-report', name: 'Equipment Report', description: 'Equipment usage and management via Auxiliary Inputs', category: 'Asset', lastRun: '2h ago' },
  { id: 'inventory', name: 'Inventory Report', description: 'Assets aggregated by location for geographical view', category: 'Asset', lastRun: '1d ago' },
  { id: 'utilization', name: 'Utilization Report', description: 'Asset usage analysis with hours per day and utilization rates', category: 'Asset', lastRun: '3h ago' },
  { id: 'dormancy', name: 'Dormancy Report', description: 'Asset inactivity duration to identify underutilized assets', category: 'Asset', lastRun: '1d ago' },
  { id: 'historic-diagnostics', name: 'Historical Asset Diagnostic Data', description: 'Historical engine data for asset health and maintenance planning', category: 'Asset', lastRun: '6h ago' },
  { id: 'detention', name: 'Detention Report', description: 'Trailer loading/unloading times by location', category: 'Asset', lastRun: '2h ago' },
  
  // Driver Compliance Reports
  { id: 'hos-report', name: 'Hours of Service Report', description: 'Driver HOS compliance status, driving hours, and violations', category: 'Compliance', lastRun: '15m ago' },
  { id: 'hos-violations', name: 'HOS Violations Report', description: 'Compliance breaches and missing certifications', category: 'Compliance', lastRun: '1h ago' },
  { id: 'unassigned-hos', name: 'Unassigned HOS Report', description: 'Unassigned driving segments by vehicle', category: 'Compliance', lastRun: '2h ago' },
  { id: 'hos-audit', name: 'Driver HOS Audit Report', description: 'Audit trail of duty status changes and log edits', category: 'Compliance', lastRun: '1d ago' },
  { id: 'duty-status-summary', name: 'Duty Status Summary Report', description: 'Time in each duty status: Off Duty, Sleeper, Driving, On Duty', category: 'Compliance', lastRun: '1h ago' },
  { id: 'dvir', name: 'Driver Vehicle Inspection Reports', description: 'Electronic inspection submissions and defect reporting', category: 'Compliance', lastRun: '30m ago' },
  { id: 'infringement', name: 'Infringement Report', description: 'EU 561/2006 driving, resting, and working violations', category: 'Compliance', lastRun: '1h ago', region: 'EU' },
  
  // Driver Safety Reports
  { id: 'safety-overview', name: 'Safety Overview', description: 'Fleet safety analysis with driver behaviors and risk factors', category: 'Safety', lastRun: '1h ago' },
  { id: 'coaching', name: 'Coaching Report', description: 'Finalized and upcoming coaching sessions summary', category: 'Safety', lastRun: '3h ago' },
  { id: 'coaching-effectiveness', name: 'Coaching Effectiveness Report', description: 'Impact of coaching on reducing repeat behaviors', category: 'Safety', lastRun: '1d ago' },
  { id: 'coaching-timeliness', name: 'Coaching Timeliness Report', description: 'Coaching response times and past due sessions', category: 'Safety', lastRun: '1d ago' },
  { id: 'event-resolution', name: 'Event Resolution Report', description: 'Safety event and In-Cab Nudge resolution progress', category: 'Safety', lastRun: '2h ago' },
  { id: 'speeding', name: 'Speeding Reports', description: 'Speeding incidents, trends, and impact on safety scores', category: 'Safety', lastRun: '1h ago' },
  { id: 'harsh-events', name: 'Harsh Event Reports', description: 'G-force threshold incidents and harsh driving behaviors', category: 'Safety', lastRun: '2h ago' },
  
  // Dispatch Reports
  { id: 'recurring-routes', name: 'Recurring Routes Report', description: 'Performance of scheduled recurring routes', category: 'Dispatch', lastRun: '4h ago' },
  { id: 'planned-vs-actual', name: 'Planned vs Actual Report', description: 'Comparison of forecasted vs actual route outcomes', category: 'Dispatch', lastRun: '2h ago' },
  
  // Fuel & Energy Reports
  { id: 'fuel-energy', name: 'Fuel & Energy Report', description: 'Fuel efficiency and consumption for all vehicle types', category: 'Fuel & Energy', lastRun: '1h ago' },
  { id: 'fuel-purchases', name: 'Fuel Purchases Report', description: 'Fuel transactions matched with vehicle locations', category: 'Fuel & Energy', lastRun: '3h ago' },
  { id: 'ifta', name: 'IFTA Report', description: 'Mileage by jurisdiction for fuel tax compliance', category: 'Fuel & Energy', lastRun: '1d ago' },
  { id: 'ev-charging', name: 'EV Charging Trends Report', description: 'EV charging patterns, duration, and energy consumption', category: 'Fuel & Energy', lastRun: '6h ago' },
  { id: 'driver-efficiency', name: 'Driver Efficiency Report', description: 'Driving behaviors affecting fuel costs and vehicle wear', category: 'Fuel & Energy', lastRun: '2h ago' },
  { id: 'idling', name: 'Idling Report', description: 'Vehicle idling events to reduce fuel costs', category: 'Fuel & Energy', lastRun: '1h ago' },
  { id: 'ev-suitability', name: 'EV Suitability Report', description: 'Fleet vehicles suitable for EV replacement', category: 'Fuel & Energy', lastRun: '1w ago' },
  { id: 'sustainability', name: 'Sustainability Report', description: 'Carbon emissions tracking and sustainability goals', category: 'Fuel & Energy', lastRun: '1d ago' },
  
  // Device Reports
  { id: 'vg-health', name: 'Gateway Health Report', description: 'Health status of Vehicle and Asset Gateways', category: 'Device', lastRun: '1h ago' },
  { id: 'camera-health', name: 'Camera Device Health', description: 'Dash camera and connector health status', category: 'Device', lastRun: '2h ago' },
  { id: 'tacho-health', name: 'Tachograph Health', description: 'Tachograph download status and troubleshooting', category: 'Device', lastRun: '30m ago', region: 'EU' },
  { id: 'data-usage', name: 'Data Usage Report', description: 'Wi-Fi hotspot usage trends across fleet', category: 'Device', lastRun: '1d ago' },
];

// Report Scheduler Modal Component
const ReportScheduler = ({ report, onClose, onSave }) => {
  const [scheduleName, setScheduleName] = useState(report?.name ? `${report.name} - Weekly` : '');
  const [reportFormat, setReportFormat] = useState('xlsx');
  const [recurrence, setRecurrence] = useState('weekly');
  const [selectedDays, setSelectedDays] = useState(['monday']);
  const [sendTime, setSendTime] = useState('08:00');
  const [timeRangeType, setTimeRangeType] = useState('last_7_days');
  const [selectedTags, setSelectedTags] = useState([]);
  const [recipients, setRecipients] = useState([]);
  
  const days = [
    { id: 'monday', label: 'M' },
    { id: 'tuesday', label: 'T' },
    { id: 'wednesday', label: 'W' },
    { id: 'thursday', label: 'T' },
    { id: 'friday', label: 'F' },
    { id: 'saturday', label: 'S' },
    { id: 'sunday', label: 'S' },
  ];
  
  const timeRanges = [
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last_7_days', label: 'Last 7 days' },
    { id: 'last_14_days', label: 'Last 14 days' },
    { id: 'last_30_days', label: 'Last 30 days' },
    { id: 'this_week', label: 'This week' },
    { id: 'last_week', label: 'Last week' },
    { id: 'this_month', label: 'This month' },
    { id: 'last_month', label: 'Last month' },
  ];
  
  const availableTags = [
    { id: 'paris', name: 'Paris Fleet' },
    { id: 'lyon', name: 'Lyon Ops' },
    { id: 'berlin', name: 'Berlin Hub' },
    { id: 'london', name: 'London Fleet' },
  ];
  
  const existingContacts = [
    { id: 'c1', name: 'Mael Kerebel', email: 'mael@company.com', type: 'user' },
    { id: 'c2', name: 'Sophie Martin', email: 'sophie@company.com', type: 'user' },
    { id: 'c3', name: 'Fleet Operations', email: 'fleet-ops@company.com', type: 'contact' },
    { id: 'c4', name: 'Compliance Team', email: 'compliance@company.com', type: 'contact' },
  ];
  
  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };
  
  const addRecipient = (contact) => {
    if (!recipients.find(r => r.id === contact.id)) {
      setRecipients([...recipients, contact]);
    }
  };
  
  const removeRecipient = (contactId) => {
    setRecipients(recipients.filter(r => r.id !== contactId));
  };
  
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(t => t !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  
  const handleSave = () => {
    onSave({
      name: scheduleName,
      report: report?.name,
      format: reportFormat,
      recurrence,
      days: selectedDays,
      time: sendTime,
      timeRange: timeRangeType,
      tags: selectedTags,
      recipients,
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col" style={{ maxHeight: 'calc(100vh - 32px)' }}>
        {/* Header - Compact */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Schedule Report</h2>
            <p className="text-xs text-gray-500">{report?.name}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg">
            <X size={18} className="text-gray-500" />
          </button>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Schedule Name */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Schedule Name</label>
            <input
              type="text"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              placeholder="e.g. Weekly Driver Report"
              className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Format & Recurrence Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Format</label>
              <div className="flex gap-1">
                {['csv', 'xlsx', 'pdf'].map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setReportFormat(fmt)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                      reportFormat === fmt
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Recurrence</label>
              <div className="flex gap-1">
                {['daily', 'weekly', 'monthly'].map(rec => (
                  <button
                    key={rec}
                    onClick={() => setRecurrence(rec)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                      recurrence === rec
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {rec.charAt(0).toUpperCase() + rec.slice(1, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Weekly Days Selection */}
          {recurrence === 'weekly' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Days:</span>
              {days.map(day => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`w-7 h-7 rounded-full text-xs font-medium transition-colors ${
                    selectedDays.includes(day.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          )}
          
          {/* Time Range & Send Time Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Data Range</label>
              <select
                value={timeRangeType}
                onChange={(e) => setTimeRangeType(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Send Time (CET)</label>
              <select
                value={sendTime}
                onChange={(e) => setSendTime(e.target.value)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = i.toString().padStart(2, '0');
                  return <option key={hour} value={`${hour}:00`}>{hour}:00</option>;
                })}
              </select>
            </div>
          </div>
          
          {/* Tags - Inline */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Filter by Tags (optional)</label>
            <div className="flex flex-wrap gap-1.5">
              {availableTags.map(tag => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Recipients */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Recipients</label>
            
            {/* Selected */}
            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {recipients.map(r => (
                  <span key={r.id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                    {r.name}
                    <button onClick={() => removeRecipient(r.id)} className="hover:text-blue-900">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {/* Available - Compact List */}
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-28 overflow-auto">
              {existingContacts.filter(c => !recipients.find(r => r.id === c.id)).map(contact => (
                <button
                  key={contact.id}
                  onClick={() => addRecipient(contact)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 text-left"
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    contact.type === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900 truncate">{contact.name}</p>
                  </div>
                  <Plus size={14} className="text-gray-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer - Fixed */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50 shrink-0">
          <button onClick={onClose} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">
              Test Email
            </button>
            <button
              onClick={handleSave}
              disabled={!scheduleName || recipients.length === 0}
              className="px-4 py-1.5 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const customReports = [
  { id: 'custom-1', name: 'Weekly Driver Performance', description: 'Custom scorecard combining safety + compliance', createdBy: 'Mael', lastRun: '1d ago', dataset: 'Drivers', columns: 5 },
  { id: 'custom-2', name: 'Paris Fleet Fuel Analysis', description: 'Fuel efficiency for Paris team only', createdBy: 'Mael', lastRun: '3d ago', dataset: 'Assets', columns: 8 },
  { id: 'custom-3', name: 'Cross-border Compliance', description: 'Multi-country regulation tracking', createdBy: 'Sophie', lastRun: '1w ago', dataset: 'Trips', columns: 6 },
];

// Dataset definitions for Advanced Custom Reports
// Each dataset has linkFields that can be used to join with other datasets
const datasets = [
  { 
    id: 'organization', 
    name: 'Organization', 
    description: 'Organizational hierarchy including regions, branches, teams, and tags',
    icon: Building2,
    linkFields: ['tag_id', 'team_id', 'branch_id', 'region_id'],
    fields: [
      { id: 'org_name', name: 'Organization Name', type: 'text', default: true },
      { id: 'region_id', name: 'Region ID', type: 'text', default: false, linkable: true },
      { id: 'region_name', name: 'Region Name', type: 'text', default: true },
      { id: 'branch_id', name: 'Branch ID', type: 'text', default: false, linkable: true },
      { id: 'branch_name', name: 'Branch Name', type: 'text', default: true },
      { id: 'team_id', name: 'Team ID', type: 'text', default: false, linkable: true },
      { id: 'team_name', name: 'Team Name', type: 'text', default: true },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
      { id: 'tag_name', name: 'Tag Name', type: 'text', default: true },
      { id: 'tag_type', name: 'Tag Type', type: 'text', default: false },
      { id: 'parent_tag', name: 'Parent Tag', type: 'text', default: false },
      { id: 'vehicle_count', name: 'Vehicle Count', type: 'number', default: true },
      { id: 'driver_count', name: 'Driver Count', type: 'number', default: true },
      { id: 'manager_name', name: 'Manager Name', type: 'text', default: false },
      { id: 'manager_email', name: 'Manager Email', type: 'text', default: false },
      { id: 'timezone', name: 'Timezone', type: 'text', default: false },
      { id: 'country', name: 'Country', type: 'text', default: true },
      { id: 'address', name: 'Address', type: 'text', default: false },
    ]
  },
  { 
    id: 'assets', 
    name: 'Assets', 
    description: 'Vehicle and device data such as odometer readings, camera status, and submitted DVIRs',
    icon: Truck,
    linkFields: ['asset_id', 'driver_id', 'tag_id'],
    fields: [
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: true },
      { id: 'vin', name: 'VIN', type: 'text', default: true },
      { id: 'license_plate', name: 'License Plate', type: 'text', default: true },
      { id: 'make', name: 'Make', type: 'text', default: false },
      { id: 'model', name: 'Model', type: 'text', default: false },
      { id: 'year', name: 'Year', type: 'number', default: false },
      { id: 'asset_type', name: 'Asset Type', type: 'text', default: false },
      { id: 'odometer', name: 'Odometer', type: 'number', default: true },
      { id: 'engine_hours', name: 'Engine Hours', type: 'number', default: false },
      { id: 'fuel_level', name: 'Fuel Level %', type: 'number', default: false },
      { id: 'gateway_serial', name: 'Gateway Serial', type: 'text', default: false },
      { id: 'camera_status', name: 'Camera Status', type: 'text', default: false },
      { id: 'last_location', name: 'Last Location', type: 'text', default: true },
      { id: 'current_driver_id', name: 'Current Driver ID', type: 'text', default: false, linkable: true },
      { id: 'current_driver_name', name: 'Current Driver', type: 'text', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
      { id: 'tags', name: 'Tags', type: 'tag', default: true },
    ]
  },
  { 
    id: 'drivers', 
    name: 'Drivers', 
    description: 'Driver-specific information including safety behaviors, compliance data, and fuel-related driving habits',
    icon: User,
    linkFields: ['driver_id', 'asset_id', 'tag_id'],
    fields: [
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'employee_id', name: 'Employee ID', type: 'text', default: false },
      { id: 'email', name: 'Email', type: 'text', default: false },
      { id: 'phone', name: 'Phone', type: 'text', default: false },
      { id: 'license_number', name: 'License Number', type: 'text', default: true },
      { id: 'license_state', name: 'License State', type: 'text', default: false },
      { id: 'license_expiry', name: 'License Expiry', type: 'datetime', default: false },
      { id: 'driver_status', name: 'Status', type: 'text', default: false },
      { id: 'safety_score', name: 'Safety Score', type: 'number', default: true },
      { id: 'total_distance', name: 'Total Distance', type: 'number', default: true },
      { id: 'total_drive_time', name: 'Total Drive Time', type: 'number', default: true },
      { id: 'harsh_events', name: 'Harsh Events', type: 'number', default: false },
      { id: 'speeding_events', name: 'Speeding Events', type: 'number', default: false },
      { id: 'hos_violations', name: 'HOS Violations', type: 'number', default: false },
      { id: 'idle_time', name: 'Idle Time', type: 'number', default: false },
      { id: 'assigned_asset_id', name: 'Assigned Asset ID', type: 'text', default: false, linkable: true },
      { id: 'assigned_asset_name', name: 'Assigned Asset', type: 'text', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
      { id: 'tags', name: 'Tags', type: 'tag', default: true },
      { id: 'coach_name', name: 'Coach Name', type: 'text', default: false },
      { id: 'hire_date', name: 'Hire Date', type: 'datetime', default: false },
    ]
  },
  { 
    id: 'trips', 
    name: 'Trips', 
    description: 'Trip data including start/end locations, distance, duration, and driver assignments',
    icon: MapPin,
    linkFields: ['trip_id', 'asset_id', 'driver_id', 'tag_id'],
    fields: [
      { id: 'trip_id', name: 'Trip ID', type: 'text', default: false, linkable: true },
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: true },
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'start_time', name: 'Start Time', type: 'datetime', default: true },
      { id: 'end_time', name: 'End Time', type: 'datetime', default: true },
      { id: 'start_location', name: 'Start Location', type: 'text', default: true },
      { id: 'end_location', name: 'End Location', type: 'text', default: true },
      { id: 'start_address', name: 'Start Address', type: 'text', default: false },
      { id: 'end_address', name: 'End Address', type: 'text', default: false },
      { id: 'distance', name: 'Distance', type: 'number', default: true },
      { id: 'duration', name: 'Duration', type: 'number', default: true },
      { id: 'max_speed', name: 'Max Speed', type: 'number', default: false },
      { id: 'avg_speed', name: 'Avg Speed', type: 'number', default: false },
      { id: 'idle_time', name: 'Idle Time', type: 'number', default: false },
      { id: 'fuel_consumed', name: 'Fuel Consumed', type: 'number', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
      { id: 'tags', name: 'Tags', type: 'tag', default: false },
    ]
  },
  { 
    id: 'safety_events', 
    name: 'Safety Events', 
    description: 'Safety incidents including harsh events, speeding, distraction, and coaching status',
    icon: AlertTriangle,
    linkFields: ['event_id', 'asset_id', 'driver_id', 'trip_id', 'tag_id'],
    fields: [
      { id: 'event_id', name: 'Event ID', type: 'text', default: false, linkable: true },
      { id: 'event_type', name: 'Event Type', type: 'text', default: true },
      { id: 'behavior', name: 'Behavior', type: 'text', default: true },
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: true },
      { id: 'trip_id', name: 'Trip ID', type: 'text', default: false, linkable: true },
      { id: 'timestamp', name: 'Timestamp', type: 'datetime', default: true },
      { id: 'location', name: 'Location', type: 'text', default: true },
      { id: 'severity', name: 'Severity', type: 'text', default: true },
      { id: 'g_force', name: 'Max G-Force', type: 'number', default: false },
      { id: 'speed', name: 'Speed', type: 'number', default: false },
      { id: 'speed_limit', name: 'Speed Limit', type: 'number', default: false },
      { id: 'coaching_status', name: 'Coaching Status', type: 'text', default: false },
      { id: 'coached_by', name: 'Coached By', type: 'text', default: false },
      { id: 'coached_date', name: 'Coached Date', type: 'datetime', default: false },
      { id: 'has_video', name: 'Has Video', type: 'boolean', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
    ]
  },
  { 
    id: 'fuel', 
    name: 'Fuel & Energy', 
    description: 'Fuel consumption, purchases, efficiency metrics, and EV charging data',
    icon: Fuel,
    linkFields: ['asset_id', 'driver_id', 'trip_id', 'tag_id'],
    fields: [
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: true },
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'trip_id', name: 'Trip ID', type: 'text', default: false, linkable: true },
      { id: 'date', name: 'Date', type: 'datetime', default: true },
      { id: 'fuel_consumed', name: 'Fuel Consumed (L)', type: 'number', default: true },
      { id: 'distance', name: 'Distance (km)', type: 'number', default: true },
      { id: 'efficiency', name: 'Efficiency (L/100km)', type: 'number', default: true },
      { id: 'idle_fuel', name: 'Idle Fuel (L)', type: 'number', default: false },
      { id: 'fuel_cost', name: 'Fuel Cost', type: 'number', default: false },
      { id: 'fuel_type', name: 'Fuel Type', type: 'text', default: false },
      { id: 'co2_emissions', name: 'CO2 Emissions (kg)', type: 'number', default: false },
      { id: 'fill_ups', name: 'Fill-ups', type: 'number', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
    ]
  },
  { 
    id: 'hos', 
    name: 'Hours of Service', 
    description: 'HOS compliance data, duty status, violations, and tachograph records',
    icon: Clock,
    linkFields: ['driver_id', 'asset_id', 'tag_id'],
    fields: [
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: false },
      { id: 'date', name: 'Date', type: 'datetime', default: true },
      { id: 'driving_time', name: 'Driving Time', type: 'number', default: true },
      { id: 'on_duty_time', name: 'On Duty Time', type: 'number', default: true },
      { id: 'off_duty_time', name: 'Off Duty Time', type: 'number', default: false },
      { id: 'sleeper_time', name: 'Sleeper Time', type: 'number', default: false },
      { id: 'available_time', name: 'Available Time', type: 'number', default: true },
      { id: 'break_time', name: 'Break Time', type: 'number', default: false },
      { id: 'violations', name: 'Violations', type: 'number', default: true },
      { id: 'violation_type', name: 'Violation Type', type: 'text', default: false },
      { id: 'violation_severity', name: 'Violation Severity', type: 'text', default: false },
      { id: 'certification_status', name: 'Certification Status', type: 'text', default: false },
      { id: 'eld_mode', name: 'ELD Mode', type: 'text', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
    ]
  },
  { 
    id: 'dvir', 
    name: 'Vehicle Inspections', 
    description: 'Driver Vehicle Inspection Reports with defects and resolution status',
    icon: ClipboardCheck,
    linkFields: ['inspection_id', 'asset_id', 'driver_id', 'tag_id'],
    fields: [
      { id: 'inspection_id', name: 'Inspection ID', type: 'text', default: false, linkable: true },
      { id: 'asset_id', name: 'Asset ID', type: 'text', default: false, linkable: true },
      { id: 'asset_name', name: 'Asset Name', type: 'text', default: true },
      { id: 'driver_id', name: 'Driver ID', type: 'text', default: false, linkable: true },
      { id: 'driver_name', name: 'Driver Name', type: 'text', default: true },
      { id: 'inspection_type', name: 'Type', type: 'text', default: true },
      { id: 'timestamp', name: 'Timestamp', type: 'datetime', default: true },
      { id: 'status', name: 'Status', type: 'text', default: true },
      { id: 'defects_count', name: 'Defects Count', type: 'number', default: true },
      { id: 'defect_category', name: 'Defect Category', type: 'text', default: false },
      { id: 'defect_details', name: 'Defect Details', type: 'text', default: false },
      { id: 'is_safe', name: 'Safe to Operate', type: 'boolean', default: false },
      { id: 'mechanic', name: 'Mechanic', type: 'text', default: false },
      { id: 'resolution_date', name: 'Resolution Date', type: 'datetime', default: false },
      { id: 'resolution_notes', name: 'Resolution Notes', type: 'text', default: false },
      { id: 'tag_id', name: 'Tag ID', type: 'text', default: false, linkable: true },
    ]
  },
];

// Define which datasets can be merged together based on common link fields
const datasetRelationships = {
  'organization': { 
    canMergeWith: ['assets', 'drivers', 'trips', 'safety_events', 'fuel', 'hos', 'dvir'],
    linkVia: 'tag_id',
    description: 'Add organization hierarchy to any dataset via tags'
  },
  'assets': { 
    canMergeWith: ['drivers', 'trips', 'safety_events', 'fuel', 'hos', 'dvir', 'organization'],
    linkVia: 'asset_id',
    description: 'Link vehicle data to trips, events, and driver records'
  },
  'drivers': { 
    canMergeWith: ['assets', 'trips', 'safety_events', 'fuel', 'hos', 'dvir', 'organization'],
    linkVia: 'driver_id',
    description: 'Combine driver info with performance and compliance data'
  },
  'trips': { 
    canMergeWith: ['assets', 'drivers', 'safety_events', 'fuel', 'organization'],
    linkVia: 'trip_id',
    description: 'Enrich trip data with vehicle and driver details'
  },
  'safety_events': { 
    canMergeWith: ['assets', 'drivers', 'trips', 'organization'],
    linkVia: 'event_id',
    description: 'Add context to safety events from related records'
  },
  'fuel': { 
    canMergeWith: ['assets', 'drivers', 'trips', 'organization'],
    linkVia: 'asset_id',
    description: 'Correlate fuel usage with trip and driver data'
  },
  'hos': { 
    canMergeWith: ['drivers', 'assets', 'organization'],
    linkVia: 'driver_id',
    description: 'Link compliance records to driver and vehicle info'
  },
  'dvir': { 
    canMergeWith: ['assets', 'drivers', 'organization'],
    linkVia: 'asset_id',
    description: 'Connect inspection data with vehicle and driver records'
  },
};

// Custom Report Builder Component
const CustomReportBuilder = ({ onClose, onSave }) => {
  const [step, setStep] = useState(1); // 1: dataset, 2: merge, 3: columns, 4: configure
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [mergedDatasets, setMergedDatasets] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [reportName, setReportName] = useState('');
  const [filters, setFilters] = useState([]);
  const [groupBy, setGroupBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [visibility, setVisibility] = useState('private');
  const [sharedWith, setSharedWith] = useState([]);
  
  const handleDatasetSelect = (dataset) => {
    setSelectedDataset(dataset);
    setMergedDatasets([]);
    setSelectedFields([]);
    setStep(2); // Go to merge step
  };
  
  const handleSkipMerge = () => {
    setSelectedFields(selectedDataset.fields.filter(f => f.default).map(f => ({ 
      ...f, 
      customName: f.name,
      sourceDataset: selectedDataset.id 
    })));
    setStep(3);
  };
  
  const handleAddMerge = (datasetId) => {
    const dataset = datasets.find(d => d.id === datasetId);
    if (dataset && !mergedDatasets.find(d => d.id === datasetId)) {
      setMergedDatasets([...mergedDatasets, dataset]);
    }
  };
  
  const handleRemoveMerge = (datasetId) => {
    setMergedDatasets(mergedDatasets.filter(d => d.id !== datasetId));
    // Remove fields from that dataset
    setSelectedFields(selectedFields.filter(f => f.sourceDataset !== datasetId));
  };
  
  const handleContinueFromMerge = () => {
    // Prepare fields from primary and merged datasets
    const primaryFields = selectedDataset.fields.filter(f => f.default).map(f => ({
      ...f,
      customName: f.name,
      sourceDataset: selectedDataset.id
    }));
    
    // Add some default fields from merged datasets (non-duplicate)
    const mergedFields = [];
    const existingFieldNames = new Set(primaryFields.map(f => f.name));
    
    mergedDatasets.forEach(dataset => {
      dataset.fields.filter(f => f.default && !existingFieldNames.has(f.name)).slice(0, 3).forEach(f => {
        mergedFields.push({
          ...f,
          customName: `${dataset.name}: ${f.name}`,
          sourceDataset: dataset.id
        });
        existingFieldNames.add(f.name);
      });
    });
    
    setSelectedFields([...primaryFields, ...mergedFields]);
    setStep(3);
  };
  
  const getAllAvailableFields = () => {
    const allFields = [];
    
    // Add fields from primary dataset
    selectedDataset.fields.forEach(f => {
      allFields.push({
        ...f,
        sourceDataset: selectedDataset.id,
        sourceName: selectedDataset.name
      });
    });
    
    // Add fields from merged datasets
    mergedDatasets.forEach(dataset => {
      dataset.fields.forEach(f => {
        allFields.push({
          ...f,
          sourceDataset: dataset.id,
          sourceName: dataset.name
        });
      });
    });
    
    return allFields;
  };
  
  const toggleField = (field) => {
    const fieldKey = `${field.sourceDataset}-${field.id}`;
    const existingIndex = selectedFields.findIndex(f => `${f.sourceDataset}-${f.id}` === fieldKey);
    
    if (existingIndex >= 0) {
      setSelectedFields(selectedFields.filter((_, i) => i !== existingIndex));
    } else if (selectedFields.length < 15) {
      const defaultName = mergedDatasets.length > 0 && field.sourceDataset !== selectedDataset.id
        ? `${field.sourceName}: ${field.name}`
        : field.name;
      setSelectedFields([...selectedFields, { ...field, customName: defaultName }]);
    }
  };
  
  const isFieldSelected = (field) => {
    const fieldKey = `${field.sourceDataset}-${field.id}`;
    return selectedFields.some(f => `${f.sourceDataset}-${f.id}` === fieldKey);
  };
  
  const moveField = (index, direction) => {
    const newFields = [...selectedFields];
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < newFields.length) {
      [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
      setSelectedFields(newFields);
    }
  };
  
  const renameField = (index, newName) => {
    const newFields = [...selectedFields];
    newFields[index].customName = newName;
    setSelectedFields(newFields);
  };
  
  const addFilter = () => {
    if (selectedFields.length > 0) {
      setFilters([...filters, { field: selectedFields[0].id, operator: 'equals', value: '' }]);
    }
  };
  
  const getAvailableMerges = () => {
    if (!selectedDataset) return [];
    const relationships = datasetRelationships[selectedDataset.id];
    if (!relationships) return [];
    
    return relationships.canMergeWith
      .filter(id => !mergedDatasets.find(d => d.id === id))
      .map(id => datasets.find(d => d.id === id))
      .filter(Boolean);
  };

  const totalSteps = 4;
  const stepLabels = ['Select Dataset', 'Merge Data', 'Choose Columns', 'Configure'];
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Create Custom Report</h2>
            <p className="text-xs text-gray-500">Step {step} of {totalSteps}: {stepLabels[step - 1]}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s < step ? 'bg-green-500 text-white' :
                  s === step ? 'bg-blue-600 text-white' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {s < step ? <Check size={16} /> : s}
                </div>
                {s < 4 && <div className={`w-12 h-0.5 mx-2 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Step 1: Dataset Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Select a primary dataset for your custom report. You can merge additional datasets in the next step.</p>
              <div className="grid grid-cols-2 gap-3">
                {datasets.map(dataset => (
                  <button
                    key={dataset.id}
                    onClick={() => handleDatasetSelect(dataset)}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all text-left group"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <dataset.icon size={20} className="text-gray-600 group-hover:text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{dataset.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{dataset.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{dataset.fields.length} fields available</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 mt-3" />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Merge Datasets */}
          {step === 2 && selectedDataset && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Primary Dataset</h3>
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <selectedDataset.icon size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">{selectedDataset.name}</p>
                    <p className="text-xs text-blue-600">{selectedDataset.fields.length} fields</p>
                  </div>
                </div>
              </div>
              
              {/* Merged datasets */}
              {mergedDatasets.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Merged Datasets</h3>
                  <div className="space-y-2">
                    {mergedDatasets.map(dataset => {
                      const linkInfo = datasetRelationships[selectedDataset.id];
                      return (
                        <div key={dataset.id} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <dataset.icon size={16} className="text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-green-900">{dataset.name}</p>
                            <p className="text-xs text-green-600">
                              Linked via {linkInfo?.linkVia || 'common fields'} • {dataset.fields.length} fields
                            </p>
                          </div>
                          <button 
                            onClick={() => handleRemoveMerge(dataset.id)}
                            className="p-1 hover:bg-green-100 rounded"
                          >
                            <X size={16} className="text-green-600" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Available merges */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Add Related Data</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Merge additional datasets to enrich your report. Data is linked automatically via common identifiers (driver ID, asset ID, tag).
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {getAvailableMerges().map(dataset => (
                    <button
                      key={dataset.id}
                      onClick={() => handleAddMerge(dataset.id)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all text-left"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <dataset.icon size={16} className="text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{dataset.name}</p>
                        <p className="text-xs text-gray-500 truncate">{dataset.fields.length} fields</p>
                      </div>
                      <Plus size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
                {getAvailableMerges().length === 0 && mergedDatasets.length > 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">All compatible datasets have been added</p>
                )}
              </div>
              
              {/* Link info */}
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-800 font-medium">How merging works</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Datasets are joined using common identifiers. For example, Safety Events can be enriched with Driver data 
                      via driver_id, or with Organization data via tag_id. Only matching records will be included.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Column Selection */}
          {step === 3 && selectedDataset && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Select up to 15 columns for your report. Drag to reorder.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {mergedDatasets.length > 0 
                      ? `Primary: ${selectedDataset.name} + ${mergedDatasets.length} merged dataset${mergedDatasets.length > 1 ? 's' : ''}`
                      : `Dataset: ${selectedDataset.name}`
                    } • {selectedFields.length}/15 columns selected
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Available Fields */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Available Fields</h4>
                  <div className="border border-gray-200 rounded-lg max-h-96 overflow-auto">
                    {/* Group by dataset */}
                    {[selectedDataset, ...mergedDatasets].map(dataset => (
                      <div key={dataset.id}>
                        <div className="sticky top-0 bg-gray-50 px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                          <dataset.icon size={14} className="text-gray-500" />
                          <span className="text-xs font-medium text-gray-700">{dataset.name}</span>
                          <span className="text-xs text-gray-400">({dataset.fields.length})</span>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {dataset.fields.map(field => {
                            const fieldWithSource = { ...field, sourceDataset: dataset.id, sourceName: dataset.name };
                            const selected = isFieldSelected(fieldWithSource);
                            return (
                              <button
                                key={`${dataset.id}-${field.id}`}
                                onClick={() => toggleField(fieldWithSource)}
                                disabled={!selected && selectedFields.length >= 15}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                                  selected ? 'bg-blue-50' : 'hover:bg-gray-50'
                                } ${!selected && selectedFields.length >= 15 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                  selected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                                }`}>
                                  {selected && <Check size={12} className="text-white" />}
                                </div>
                                <span className="text-sm text-gray-700 flex-1">{field.name}</span>
                                {field.linkable && (
                                  <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">Link</span>
                                )}
                                <span className="text-xs text-gray-400 capitalize">{field.type}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Selected Fields */}
                <div>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Report Columns (drag to reorder)</h4>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-96 overflow-auto">
                    {selectedFields.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-400">
                        Select fields from the left
                      </div>
                    ) : (
                      selectedFields.map((field, index) => {
                        const sourceDataset = datasets.find(d => d.id === field.sourceDataset);
                        return (
                          <div key={`${field.sourceDataset}-${field.id}`} className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50">
                            <GripVertical size={14} className="text-gray-300 cursor-grab" />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={field.customName}
                                onChange={(e) => renameField(index, e.target.value)}
                                className="w-full text-sm text-gray-700 bg-transparent border-0 focus:ring-0 p-0"
                              />
                              {mergedDatasets.length > 0 && (
                                <p className="text-[10px] text-gray-400">{sourceDataset?.name}</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => moveField(index, -1)}
                                disabled={index === 0}
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                              >
                                <ChevronUp size={14} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => moveField(index, 1)}
                                disabled={index === selectedFields.length - 1}
                                className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                              >
                                <ChevronDown size={14} className="text-gray-400" />
                              </button>
                              <button
                                onClick={() => toggleField(field)}
                                className="p-1 hover:bg-red-50 rounded"
                              >
                                <X size={14} className="text-gray-400 hover:text-red-500" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Configure */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Report Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Report Name *</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Enter report name..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              
              {/* Filters */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">Filters</label>
                  <button
                    onClick={addFilter}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus size={14} /> Add Filter
                  </button>
                </div>
                {filters.length === 0 ? (
                  <p className="text-xs text-gray-400">No filters applied</p>
                ) : (
                  <div className="space-y-2">
                    {filters.map((filter, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <select
                          value={filter.field}
                          onChange={(e) => {
                            const newFilters = [...filters];
                            newFilters[idx].field = e.target.value;
                            setFilters(newFilters);
                          }}
                          className="text-xs border border-gray-200 rounded px-2 py-1"
                        >
                          {selectedFields.map(f => (
                            <option key={`${f.sourceDataset}-${f.id}`} value={f.id}>{f.customName}</option>
                          ))}
                        </select>
                        <select
                          value={filter.operator}
                          onChange={(e) => {
                            const newFilters = [...filters];
                            newFilters[idx].operator = e.target.value;
                            setFilters(newFilters);
                          }}
                          className="text-xs border border-gray-200 rounded px-2 py-1"
                        >
                          <option value="equals">equals</option>
                          <option value="contains">contains</option>
                          <option value="greater_than">greater than</option>
                          <option value="less_than">less than</option>
                          <option value="is_empty">is empty</option>
                        </select>
                        <input
                          type="text"
                          value={filter.value}
                          onChange={(e) => {
                            const newFilters = [...filters];
                            newFilters[idx].value = e.target.value;
                            setFilters(newFilters);
                          }}
                          placeholder="Value..."
                          className="flex-1 text-xs border border-gray-200 rounded px-2 py-1"
                        />
                        <button
                          onClick={() => setFilters(filters.filter((_, i) => i !== idx))}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <X size={14} className="text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Group By & Sort */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
                  <select
                    value={groupBy || ''}
                    onChange={(e) => setGroupBy(e.target.value || null)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="">None</option>
                    {selectedFields.map(f => (
                      <option key={`${f.sourceDataset}-${f.id}`} value={f.id}>{f.customName}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Aggregate with SUM, AVG, or COUNT</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={sortBy || ''}
                    onChange={(e) => setSortBy(e.target.value || null)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2"
                  >
                    <option value="">None</option>
                    {selectedFields.map(f => (
                      <option key={`${f.sourceDataset}-${f.id}`} value={f.id}>{f.customName} (Ascending)</option>
                    ))}
                    {selectedFields.map(f => (
                      <option key={`${f.sourceDataset}-${f.id}-desc`} value={`${f.id}-desc`}>{f.customName} (Descending)</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Chart Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Visualization (optional)</label>
                <div className="flex items-center gap-2">
                  {[
                    { id: null, label: 'None', icon: Table },
                    { id: 'column', label: 'Column', icon: BarChart3 },
                    { id: 'line', label: 'Line', icon: TrendingUp },
                    { id: 'donut', label: 'Donut', icon: PieChart },
                    { id: 'metric', label: 'Metric', icon: Hash },
                  ].map(chart => (
                    <button
                      key={chart.id || 'none'}
                      onClick={() => setChartType(chart.id)}
                      className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium transition-colors ${
                        chartType === chart.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <chart.icon size={16} />
                      {chart.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Sharing Options */}
              <div className="border-t border-gray-200 pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sharing & Permissions</label>
                
                {/* Visibility Toggle */}
                <div className="flex items-center gap-4 mb-3">
                  {[
                    { id: 'private', label: 'Only me', icon: User, desc: 'Only you can view and edit' },
                    { id: 'team', label: 'My team', icon: Users, desc: 'Team members can view' },
                    { id: 'org', label: 'Organization', icon: Building2, desc: 'Everyone in org can view' },
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => setVisibility(option.id)}
                      className={`flex-1 flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                        visibility === option.id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <option.icon size={16} className={visibility === option.id ? 'text-blue-600' : 'text-gray-400'} />
                      <div className="text-left">
                        <p className={`text-xs font-medium ${visibility === option.id ? 'text-blue-700' : 'text-gray-700'}`}>
                          {option.label}
                        </p>
                        <p className="text-[10px] text-gray-500">{option.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Share with specific users/groups */}
                {visibility !== 'private' && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Share with specific users or groups</p>
                    
                    {/* Selected shares */}
                    {sharedWith.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {sharedWith.map(share => (
                          <span
                            key={share.id}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                              share.type === 'group' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {share.type === 'group' ? <Users size={12} /> : <User size={12} />}
                            {share.name}
                            <span className="text-[10px] opacity-70">({share.permission})</span>
                            <button 
                              onClick={() => setSharedWith(sharedWith.filter(s => s.id !== share.id))}
                              className="hover:opacity-70"
                            >
                              <X size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Available users and groups */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* User Groups */}
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Groups</p>
                        <div className="space-y-1">
                          {[
                            { id: 'grp-fleet-mgrs', name: 'Fleet Managers', members: 8 },
                            { id: 'grp-compliance', name: 'Compliance Team', members: 4 },
                            { id: 'grp-ops-leads', name: 'Operations Leads', members: 12 },
                            { id: 'grp-executives', name: 'Executives', members: 5 },
                          ].filter(g => !sharedWith.find(s => s.id === g.id)).map(group => (
                            <div key={group.id} className="flex items-center gap-2">
                              <button
                                onClick={() => setSharedWith([...sharedWith, { ...group, type: 'group', permission: 'view' }])}
                                className="flex-1 flex items-center gap-2 px-2 py-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-left"
                              >
                                <div className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center">
                                  <Users size={12} className="text-purple-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-900 truncate">{group.name}</p>
                                  <p className="text-[10px] text-gray-400">{group.members} members</p>
                                </div>
                                <Plus size={12} className="text-gray-400" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Individual Users */}
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Users</p>
                        <div className="space-y-1">
                          {[
                            { id: 'usr-sophie', name: 'Sophie Martin', role: 'Fleet Manager' },
                            { id: 'usr-klaus', name: 'Klaus Weber', role: 'Ops Lead' },
                            { id: 'usr-james', name: 'James Wilson', role: 'Compliance' },
                            { id: 'usr-anna', name: 'Anna Schmidt', role: 'Manager' },
                          ].filter(u => !sharedWith.find(s => s.id === u.id)).map(user => (
                            <div key={user.id} className="flex items-center gap-2">
                              <button
                                onClick={() => setSharedWith([...sharedWith, { ...user, type: 'user', permission: 'view' }])}
                                className="flex-1 flex items-center gap-2 px-2 py-1.5 bg-white border border-gray-200 rounded hover:bg-gray-50 text-left"
                              >
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                  <span className="text-[10px] font-medium text-blue-600">{user.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-gray-900 truncate">{user.name}</p>
                                  <p className="text-[10px] text-gray-400">{user.role}</p>
                                </div>
                                <Plus size={12} className="text-gray-400" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Permission note */}
                    <div className="mt-2 flex items-start gap-2 p-2 bg-amber-50 rounded text-[10px] text-amber-700">
                      <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                      <span>Viewers can run and export this report. To allow editing, share with "Edit" permission.</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Preview Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Report Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Primary Dataset:</span>
                    <span className="ml-2 text-gray-900">{selectedDataset?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Merged Datasets:</span>
                    <span className="ml-2 text-gray-900">
                      {mergedDatasets.length > 0 ? mergedDatasets.map(d => d.name).join(', ') : 'None'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Columns:</span>
                    <span className="ml-2 text-gray-900">{selectedFields.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Filters:</span>
                    <span className="ml-2 text-gray-900">{filters.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Visualization:</span>
                    <span className="ml-2 text-gray-900">{chartType ? chartType.charAt(0).toUpperCase() + chartType.slice(1) + ' Chart' : 'Table only'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Sharing:</span>
                    <span className="ml-2 text-gray-900">
                      {visibility === 'private' ? 'Private' : visibility === 'team' ? 'Team' : 'Organization'}
                      {sharedWith.length > 0 && ` + ${sharedWith.length} specific`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            {step === 1 ? 'Cancel' : '← Back'}
          </button>
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                onClick={handleSkipMerge}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Skip Merging
              </button>
            )}
            {step === 4 && (
              <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-100">
                Preview Report
              </button>
            )}
            <button
              onClick={() => {
                if (step === 2) {
                  handleContinueFromMerge();
                } else if (step < 4) {
                  setStep(step + 1);
                } else {
                  onSave({ 
                    name: reportName, 
                    dataset: selectedDataset, 
                    mergedDatasets,
                    fields: selectedFields, 
                    filters, 
                    groupBy, 
                    sortBy, 
                    chartType,
                    visibility,
                    sharedWith,
                  });
                }
              }}
              disabled={step === 3 && selectedFields.length === 0 || step === 4 && !reportName}
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 4 ? 'Save & Run Report' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Report Viewer Component - Shows actual report data
const ReportViewer = ({ report, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Find the dataset definition
  const primaryDataset = datasets.find(d => d.name === report.dataset);
  const mergedDatasetDefs = (report.mergedDatasets || []).map(name => 
    datasets.find(d => d.name === name)
  ).filter(Boolean);
  
  // Reconstruct fields from report columns
  const selectedFields = report.fields || primaryDataset?.fields.filter(f => f.default).map(f => ({
    ...f,
    customName: f.name,
    sourceDataset: primaryDataset?.id
  })) || [];
  
  React.useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      if (primaryDataset) {
        const reportData = generateReportData(primaryDataset, mergedDatasetDefs, selectedFields, []);
        setData(reportData);
      }
      setIsLoading(false);
    }, 800);
  }, [report]);
  
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };
  
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined || aVal === '-') return 1;
      if (bVal === null || bVal === undefined || bVal === '-') return -1;
      
      const comparison = typeof aVal === 'number' 
        ? aVal - bVal 
        : String(aVal).localeCompare(String(bVal));
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);
  
  const columns = selectedFields.map(f => f.customName);
  
  // Calculate summary stats for numeric columns
  const summaryStats = React.useMemo(() => {
    const stats = {};
    columns.forEach(col => {
      const values = data.map(row => row[col]).filter(v => typeof v === 'number');
      if (values.length > 0) {
        stats[col] = {
          sum: values.reduce((a, b) => a + b, 0),
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
        };
      }
    });
    return stats;
  }, [data, columns]);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{report.name}</h2>
            <p className="text-xs text-gray-500">
              {report.dataset}{report.mergedDatasets?.length > 0 ? ` + ${report.mergedDatasets.join(', ')}` : ''} • {data.length} rows
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Download size={14} />
              Export
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        {/* Summary Stats Bar */}
        {Object.keys(summaryStats).length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-6 overflow-x-auto">
            {Object.entries(summaryStats).slice(0, 4).map(([col, stats]) => (
              <div key={col} className="shrink-0">
                <p className="text-[10px] text-gray-400 uppercase tracking-wide">{col}</p>
                <p className="text-sm font-semibold text-gray-900">
                  Σ {typeof stats.sum === 'number' ? stats.sum.toLocaleString(undefined, { maximumFractionDigits: 1 }) : stats.sum}
                </p>
                <p className="text-[10px] text-gray-500">
                  Avg: {stats.avg.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </p>
              </div>
            ))}
          </div>
        )}
        
        {/* Table */}
        <div className="flex-1 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-gray-500">Loading report data...</p>
              </div>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {columns.map((col, idx) => (
                    <th 
                      key={idx}
                      onClick={() => handleSort(col)}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        {col}
                        {sortColumn === col && (
                          <span className="text-blue-600">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50">
                    {columns.map((col, colIdx) => {
                      const value = row[col];
                      const isNumber = typeof value === 'number';
                      const isBoolean = typeof value === 'boolean';
                      
                      return (
                        <td key={colIdx} className={`px-4 py-3 whitespace-nowrap ${isNumber ? 'text-right font-mono' : ''}`}>
                          {isBoolean ? (
                            value ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Yes</span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">No</span>
                            )
                          ) : isNumber ? (
                            value.toLocaleString(undefined, { maximumFractionDigits: 2 })
                          ) : value === '-' || value === null || value === undefined ? (
                            <span className="text-gray-300">—</span>
                          ) : (
                            String(value)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {data.length} of {data.length} rows
          </p>
          <div className="flex items-center gap-3">
            <button className="text-xs text-gray-500 hover:text-gray-700">
              ← Previous
            </button>
            <span className="text-xs text-gray-700 font-medium">Page 1 of 1</span>
            <button className="text-xs text-gray-500 hover:text-gray-700">
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Reports View
const CustomReportsView = () => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedReportForSchedule, setSelectedReportForSchedule] = useState(null);
  const [selectedReportForView, setSelectedReportForView] = useState(null);
  const [reports, setReports] = useState([
    { 
      id: 'custom-1', 
      name: 'Weekly Driver Performance', 
      description: 'Drivers + Safety Events report with 8 columns', 
      createdBy: 'Mael', 
      lastRun: '1d ago', 
      dataset: 'Drivers', 
      mergedDatasets: ['Safety Events'],
      columns: 8,
      visibility: 'team',
      sharedWith: [
        { id: 'grp-fleet-mgrs', name: 'Fleet Managers', type: 'group', permission: 'view' },
      ],
      fields: [
        { id: 'driver_name', customName: 'Driver Name', sourceDataset: 'drivers' },
        { id: 'safety_score', customName: 'Safety Score', sourceDataset: 'drivers' },
        { id: 'total_distance', customName: 'Total Distance (km)', sourceDataset: 'drivers' },
        { id: 'harsh_events', customName: 'Harsh Events', sourceDataset: 'drivers' },
        { id: 'speeding_events', customName: 'Speeding Events', sourceDataset: 'drivers' },
        { id: 'tags', customName: 'Team', sourceDataset: 'drivers' },
        { id: 'event_type', customName: 'Last Event Type', sourceDataset: 'safety_events' },
        { id: 'coaching_status', customName: 'Coaching Status', sourceDataset: 'safety_events' },
      ]
    },
    { 
      id: 'custom-2', 
      name: 'Paris Fleet Fuel Analysis', 
      description: 'Fuel & Energy + Assets report with 10 columns', 
      createdBy: 'Mael', 
      lastRun: '3d ago', 
      dataset: 'Fuel & Energy', 
      mergedDatasets: ['Assets'],
      columns: 10,
      visibility: 'private',
      sharedWith: [],
      fields: [
        { id: 'asset_name', customName: 'Vehicle', sourceDataset: 'fuel' },
        { id: 'driver_name', customName: 'Driver', sourceDataset: 'fuel' },
        { id: 'fuel_consumed', customName: 'Fuel (L)', sourceDataset: 'fuel' },
        { id: 'distance', customName: 'Distance (km)', sourceDataset: 'fuel' },
        { id: 'efficiency', customName: 'L/100km', sourceDataset: 'fuel' },
        { id: 'idle_fuel', customName: 'Idle Fuel (L)', sourceDataset: 'fuel' },
        { id: 'fuel_cost', customName: 'Cost (€)', sourceDataset: 'fuel' },
        { id: 'co2_emissions', customName: 'CO2 (kg)', sourceDataset: 'fuel' },
        { id: 'odometer', customName: 'Odometer', sourceDataset: 'assets' },
        { id: 'make', customName: 'Make', sourceDataset: 'assets' },
      ]
    },
    { 
      id: 'custom-3', 
      name: 'Cross-border Compliance', 
      description: 'Hours of Service + Drivers + Organization report with 12 columns', 
      createdBy: 'Sophie', 
      lastRun: '1w ago', 
      dataset: 'Hours of Service', 
      mergedDatasets: ['Drivers', 'Organization'],
      columns: 12,
      visibility: 'org',
      sharedWith: [
        { id: 'grp-compliance', name: 'Compliance Team', type: 'group', permission: 'edit' },
        { id: 'grp-executives', name: 'Executives', type: 'group', permission: 'view' },
      ],
      fields: [
        { id: 'driver_name', customName: 'Driver', sourceDataset: 'hos' },
        { id: 'date', customName: 'Date', sourceDataset: 'hos' },
        { id: 'driving_time', customName: 'Driving (min)', sourceDataset: 'hos' },
        { id: 'on_duty_time', customName: 'On Duty (min)', sourceDataset: 'hos' },
        { id: 'available_time', customName: 'Available (min)', sourceDataset: 'hos' },
        { id: 'violations', customName: 'Violations', sourceDataset: 'hos' },
        { id: 'violation_type', customName: 'Violation Type', sourceDataset: 'hos' },
        { id: 'certification_status', customName: 'Certification', sourceDataset: 'hos' },
        { id: 'license_number', customName: 'License #', sourceDataset: 'drivers' },
        { id: 'license_state', customName: 'Country', sourceDataset: 'drivers' },
        { id: 'region_name', customName: 'Region', sourceDataset: 'organization' },
        { id: 'branch_name', customName: 'Branch', sourceDataset: 'organization' },
      ]
    },
  ]);
  const [schedules, setSchedules] = useState([
    { id: 's1', name: 'Weekly Driver Performance - Weekly', report: 'Weekly Driver Performance', recurrence: 'weekly', nextRun: 'Mon, Dec 30 at 08:00', recipients: 2 },
  ]);
  
  const handleSaveReport = (report) => {
    const mergedInfo = report.mergedDatasets?.length > 0 
      ? ` + ${report.mergedDatasets.map(d => d.name).join(', ')}`
      : '';
    setReports([
      {
        id: `custom-${Date.now()}`,
        name: report.name,
        description: `${report.dataset.name}${mergedInfo} report with ${report.fields.length} columns`,
        createdBy: 'You',
        lastRun: 'Just now',
        dataset: report.dataset.name,
        mergedDatasets: report.mergedDatasets?.map(d => d.name) || [],
        columns: report.fields.length,
        fields: report.fields,
        visibility: report.visibility || 'private',
        sharedWith: report.sharedWith || [],
      },
      ...reports,
    ]);
    setShowBuilder(false);
  };
  
  const handleScheduleReport = (report) => {
    setSelectedReportForSchedule(report);
    setShowScheduler(true);
  };
  
  const handleViewReport = (report) => {
    setSelectedReportForView(report);
    setShowViewer(true);
  };
  
  const handleSaveSchedule = (schedule) => {
    setSchedules([
      {
        id: `s-${Date.now()}`,
        name: schedule.name,
        report: schedule.report,
        recurrence: schedule.recurrence,
        nextRun: 'Tomorrow at ' + schedule.time,
        recipients: schedule.recipients.length,
      },
      ...schedules,
    ]);
    setShowScheduler(false);
    setSelectedReportForSchedule(null);
  };
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Custom Reports</h1>
            <p className="text-xs text-gray-500">Build tailored reports with specific fields, filters, and visualizations</p>
          </div>
          <button 
            onClick={() => setShowBuilder(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Create Report
          </button>
        </div>
        
        {/* Scheduled Reports Section */}
        {schedules.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              Scheduled Reports
            </h2>
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
              {schedules.map(schedule => (
                <div
                  key={schedule.id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{schedule.name}</p>
                    <p className="text-xs text-gray-500">
                      {schedule.recurrence.charAt(0).toUpperCase() + schedule.recurrence.slice(1)} • {schedule.recipients} recipients
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Next run</p>
                    <p className="text-xs text-gray-900">{schedule.nextRun}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" title="Edit">
                      <Settings size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Custom Reports List */}
        <div>
          <h2 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            My Reports
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
            {reports.map(report => (
              <div
                key={report.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewReport(report)}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center relative">
                  <FileText size={20} className="text-blue-600" />
                  {/* Sharing indicator */}
                  {report.visibility && report.visibility !== 'private' && (
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
                      report.visibility === 'org' ? 'bg-purple-500' : 'bg-green-500'
                    }`}>
                      {report.visibility === 'org' ? (
                        <Globe size={10} className="text-white" />
                      ) : (
                        <Users size={10} className="text-white" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                    {report.visibility === 'private' && (
                      <Lock size={12} className="text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{report.description}</p>
                  {/* Sharing badges */}
                  {report.sharedWith?.length > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <Share2 size={10} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400">
                        Shared with {report.sharedWith.map(s => s.name).slice(0, 2).join(', ')}
                        {report.sharedWith.length > 2 && ` +${report.sharedWith.length - 2} more`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{report.dataset}</span>
                    {report.mergedDatasets?.length > 0 && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded">+{report.mergedDatasets.length} merged</span>
                    )}
                    <span>{report.columns} cols</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">by {report.createdBy} • {report.lastRun}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                    title="Share"
                  >
                    <Share2 size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                    title="Edit"
                  >
                    <Settings size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleScheduleReport(report); }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                    title="Schedule"
                  >
                    <Calendar size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded" 
                    title="Export"
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleViewReport(report); }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded font-medium"
                  >
                    <Play size={14} />
                    Run
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
              <Filter size={16} className="text-blue-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Flexible Filters</h4>
            <p className="text-xs text-gray-500 mt-1">Apply text, number, and tag-based filters to narrow down your data</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-3">
              <Layers size={16} className="text-green-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Group & Aggregate</h4>
            <p className="text-xs text-gray-500 mt-1">Use SUM, AVG, or COUNT to aggregate data like pivot tables</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
              <Calendar size={16} className="text-purple-600" />
            </div>
            <h4 className="text-sm font-medium text-gray-900">Schedule Delivery</h4>
            <p className="text-xs text-gray-500 mt-1">Automate reports to be emailed daily, weekly, or monthly</p>
          </div>
        </div>
        
        {/* Help section */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
              <HelpCircle size={16} className="text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Advanced Custom Reports</h4>
              <p className="text-xs text-blue-700 mt-1">
                Choose from 8 datasets including Organization, Assets, Drivers, Trips, Safety Events, Fuel & Energy, Hours of Service, and Vehicle Inspections. 
                Select up to 15 columns, rename them, apply filters, group data, and add visualizations to create actionable insights.
              </p>
              <div className="flex items-center gap-4 mt-3">
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View Documentation →</button>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">Watch Tutorial →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showBuilder && (
        <CustomReportBuilder 
          onClose={() => setShowBuilder(false)} 
          onSave={handleSaveReport}
        />
      )}
      
      {showScheduler && selectedReportForSchedule && (
        <ReportScheduler
          report={selectedReportForSchedule}
          onClose={() => { setShowScheduler(false); setSelectedReportForSchedule(null); }}
          onSave={handleSaveSchedule}
        />
      )}
      
      {showViewer && selectedReportForView && (
        <ReportViewer
          report={selectedReportForView}
          onClose={() => { setShowViewer(false); setSelectedReportForView(null); }}
        />
      )}
    </div>
  );
};

// Reports Submenu
const ReportsSubmenu = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'standard', label: 'Standard Reports', icon: FileText },
    { id: 'custom', label: 'Custom Reports', icon: Settings },
  ];
  
  return (
    <div className="bg-white border-b border-gray-200 px-4">
      <div className="flex items-center gap-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Standard Reports List
const StandardReportsView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', 'Activity', 'Asset', 'Compliance', 'Safety', 'Dispatch', 'Fuel & Energy', 'Device'];
  
  const filteredReports = standardReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categoryColors = {
    'Activity': 'bg-blue-100 text-blue-700',
    'Asset': 'bg-purple-100 text-purple-700',
    'Compliance': 'bg-green-100 text-green-700',
    'Safety': 'bg-red-100 text-red-700',
    'Dispatch': 'bg-amber-100 text-amber-700',
    'Fuel & Energy': 'bg-emerald-100 text-emerald-700',
    'Device': 'bg-gray-100 text-gray-700',
  };
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Standard Reports</h1>
            <p className="text-xs text-gray-500">{standardReports.length} pre-built reports for fleet operations</p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md p-1 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Reports count */}
        <p className="text-xs text-gray-500">{filteredReports.length} reports</p>
        
        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredReports.map(report => (
            <div
              key={report.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-medium text-gray-900 leading-tight">{report.name}</h3>
                <div className="flex items-center gap-1 shrink-0">
                  {report.region === 'EU' && (
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">EU</span>
                  )}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${categoryColors[report.category]}`}>
                    {report.category}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{report.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">Last run: {report.lastRun}</span>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[10px] text-gray-500 hover:text-gray-700">Schedule</button>
                  <button className="text-[10px] text-blue-600 hover:text-blue-700 font-medium">Run →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Service time data - aligned by week
const serviceTimeData = [
  { week: 'W47', avgShift: 7.8, total: 195, shifts: 25 },
  { week: 'W48', avgShift: 8.1, total: 210, shifts: 26 },
  { week: 'W49', avgShift: 7.5, total: 187, shifts: 25 },
  { week: 'W50', avgShift: 8.3, total: 216, shifts: 26 },
  { week: 'W51', avgShift: 7.9, total: 205, shifts: 26 },
  { week: 'W52', avgShift: 7.6, total: 190, shifts: 25 },
];

const infringementEvolution = [
  { week: 'W47', minor: 5, serious: 2, total: 7 },
  { week: 'W48', minor: 3, serious: 1, total: 4 },
  { week: 'W49', minor: 6, serious: 2, total: 8 },
  { week: 'W50', minor: 2, serious: 0, total: 2 },
  { week: 'W51', minor: 4, serious: 1, total: 5 },
  { week: 'W52', minor: 1, serious: 0, total: 1 },
];

// Compact Stat Tile
const CompactStat = ({ label, value, unit, trend, small }) => (
  <div className={`${small ? 'px-3 py-2' : 'px-4 py-3'}`}>
    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
    <div className="flex items-baseline gap-1">
      <span className={`font-semibold text-gray-900 ${small ? 'text-lg' : 'text-xl'}`}>{value}</span>
      {unit && <span className="text-xs text-gray-400">{unit}</span>}
      {trend !== undefined && (
        <span className={`text-xs ml-1 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'}{Math.abs(trend)}%
        </span>
      )}
    </div>
  </div>
);

// Reports Dashboard Content
const ReportsDashboardContent = () => {
  const { filters } = useFilters();
  
  const getOrgName = () => {
    const org = filters.organization;
    if (org.level === 'team') return org.team?.name;
    if (org.level === 'branch') return org.branch?.name;
    return org.region?.name;
  };
  
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Reports Dashboard</h1>
            <p className="text-xs text-gray-500">{getOrgName()}</p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Export Report
          </button>
        </div>
        
        {/* Top Stats Row - Compact tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Active Vehicles" value="6" unit="/8" small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Drivers On-Duty" value="5" trend={12} small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Compliance" value="94" unit="%" trend={3} small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Safety Score" value="87" trend={-2} small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Avg Service/Shift" value="7.6" unit="h" small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Total Service" value="1.2k" unit="h" trend={5} small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Infringements" value="27" trend={-18} small />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg">
            <CompactStat label="Distance" value="12.4k" unit="km" trend={8} small />
          </div>
        </div>
        
        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Service Time Evolution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Service Time Evolution</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Avg/Shift
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={serviceTimeData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Bar dataKey="avgShift" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Avg per Shift (h)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-around mt-2 pt-2 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-400">Period Avg</p>
                <p className="text-sm font-semibold text-gray-900">7.9h</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Period Total</p>
                <p className="text-sm font-semibold text-gray-900">1,203h</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">vs Last Period</p>
                <p className="text-sm font-semibold text-green-600">+5.2%</p>
              </div>
            </div>
          </div>
          
          {/* Infringement Evolution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Infringement Evolution</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-amber-400 rounded-full" />
                  Minor
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Serious
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={infringementEvolution} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }}
                />
                <Bar dataKey="minor" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} name="Minor" />
                <Bar dataKey="serious" stackId="a" fill="#ef4444" radius={[3, 3, 0, 0]} name="Serious" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-around mt-2 pt-2 border-t border-gray-100">
              <div className="text-center">
                <p className="text-xs text-gray-400">Total Minor</p>
                <p className="text-sm font-semibold text-amber-600">21</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Total Serious</p>
                <p className="text-sm font-semibold text-red-600">6</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">vs Last Period</p>
                <p className="text-sm font-semibold text-green-600">-18%</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Compliance Trend */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Compliance Rate</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="week" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="clean" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 3 }} name="Clean %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Fuel Consumption */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Fuel Consumption</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' }} />
                <Bar dataKey="consumption" fill="#6366f1" radius={[3, 3, 0, 0]} name="Litres" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Driver Hours Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Driver Status</h3>
            <div className="space-y-2">
              {[
                { label: 'Driving', value: 3, color: 'bg-green-500', pct: 50 },
                { label: 'Rest', value: 1, color: 'bg-blue-500', pct: 17 },
                { label: 'Break', value: 1, color: 'bg-amber-500', pct: 17 },
                { label: 'Available', value: 1, color: 'bg-gray-300', pct: 16 },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-gray-600 w-16">{item.label}</span>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Recent Infringements - Compact Table */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-900">Recent Infringements</h3>
            <button className="text-xs text-blue-600 hover:text-blue-700">View all →</button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentInfringements.map(inf => (
              <div key={inf.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${inf.severity === 'serious' ? 'bg-red-500' : 'bg-amber-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">{inf.type}</p>
                </div>
                <span className="text-xs text-gray-500 shrink-0">{inf.driver}</span>
                <span className="text-xs text-gray-400 shrink-0 w-12 text-right">{inf.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reports Page with Submenu
const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ReportsSubmenu activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'dashboard' && <ReportsDashboardContent />}
      {activeTab === 'standard' && <StandardReportsView />}
      {activeTab === 'custom' && <CustomReportsView />}
    </div>
  );
};

// Fleet Overview Page (with vehicle list)
const FleetPage = () => {
  return (
    <div className="flex-1 flex overflow-hidden">
      <VehicleListPanel />
      <div className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <MapPin size={48} className="mx-auto mb-3 opacity-50" />
          <p className="text-sm">Map view would render here</p>
          <p className="text-xs">Showing vehicle locations in real-time</p>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard
const FleetDashboard = () => {
  const [activePage, setActivePage] = useState('reports');
  
  return (
    <FilterProvider>
      <div className="h-screen bg-gray-50 flex overflow-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <IconSidebar activePage={activePage} setActivePage={setActivePage} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <FilterHeader />
          
          {activePage === 'fleet' || activePage === 'overview' ? (
            <FleetPage />
          ) : (
            <ReportsPage />
          )}
        </div>
      </div>
    </FilterProvider>
  );
};

export default FleetDashboard;
