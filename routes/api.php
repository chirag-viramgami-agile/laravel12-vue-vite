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
    Route::get('/me',[HomeController::class,'me']);

    Route::get('/admin/dashboard', [HomeController::class ,'dashboard']);
    Route::apiResource('/admin/users', UserController::class);
    Route::apiResource('/admin/roles', RoleController::class);
    Route::get('/admin/permissions', [RoleController::class,'permissions']);
});
