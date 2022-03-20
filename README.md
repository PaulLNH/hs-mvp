# Handy Schedule
Basic Scheduling app for visiting tradespeople.

## Requirements

### Business

As a business owner
I want to manage my appointments online
So I can spend less time managing appointments and more time on the job

As a business owner
I want to create services with rates
So that when my customers book services, I know how big the job is going to be ahead of time

As a business owner
I want to assign employees to an appointment
So that my customers will know who to expect, and I can track my staff's jobs

### Customer

As a customer needing trade professional services at my location
I want to be able to book an appointment online
So that I can easily schedule the date and services that work for my schedule and budget

As a customer booking an appointment
I want to specify the details of the job
So that I can get an instant estimate of the job prior to booking the appointment

As a customer who has booked an appointment
I want to be able to update the details of the appointment
So that I may add or remove services, add notes, change the date, or cancel the appointment

## Workflow

User creates a tenant

Tenant admin creates services
```json

```

## Endpoints

### Users

POST /users
GET /users
GET /users/{id}
PATCH /users/{id}
DELETE /users/{id}

### Tenants

POST /tenants 
GET /tenants
GET /tenants/{id}
PATCH /tenants/{id}
DELETE /tenants/{id}
POST /tenants/{id}/services
GET /tenants/{id}/services
GET /tenants/{id}/services/{id}
PATCH /tenants/{id}/services/{id}
DELETE /tenants/{id}/services/{id}

### Locations

POST /locations
GET /locations
GET /locations/{id}
PATCH /locations/{id}
DELETE /locations/{id}

### Appoinments

POST /appointments 
GET /appointments
GET /appointments/{id}
PATCH /appointments/{id}
DELETE /appointments/{id}
POST /appointments/{id}/tasks
GET /appointments/{id}/tasks
GET /appointments/{id}/tasks/{id}
PATCH /appointments/{id}/tasks/{id}
DELETE /appointments/{id}/tasks/{id}