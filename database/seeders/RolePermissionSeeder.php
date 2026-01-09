<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $permissions = [
            // Core
            'view_dashboard',

            // Users
            'users.view',
            'users.create',
            'users.update',
            'users.delete',

            // Roles
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',

            // CRM
            'customers.view',
            'customers.create',
            'customers.update',
            'customers.delete',

            'leads.view',
            'leads.create',
            'leads.update',
            'leads.delete',

            'deals.view',
            'deals.create',
            'deals.update',
            'deals.delete',

            // Settings
            'settings.view',
            'settings.update',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $user  = Role::firstOrCreate(['name' => 'user']);

        // Admin = everything
        $admin->syncPermissions($permissions);

        // Normal user = read-only CRM
        $user->syncPermissions([
            'view_dashboard',
            'customers.view',
            'leads.view',
            'deals.view',
        ]);
    }
}
