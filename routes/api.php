<?php

use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth:sanctum');


Route::group(['middleware'=>['auth:sanctum']],function () {
    Route::get('/me', function (Request $request) {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,

            // flattened, explicit
            'roles' => $user->roles->pluck('name'),

            // resolved, authoritative permissions
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    });

    Route::apiResource('/admin/dashboard', HomeController::class)->middleware(['permission:manage_users']);
    Route::apiResource('/admin/users', UserController::class)->middleware(['permission:manage_users']);
    Route::apiResource('/admin/roles', RoleController::class)->middleware(['permission:manage_roles']);
    Route::get('/admin/permissions', [RoleController::class,'permissions'])->middleware(['permission:manage_roles']);
});
