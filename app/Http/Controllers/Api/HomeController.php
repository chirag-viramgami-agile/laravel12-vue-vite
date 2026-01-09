<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class HomeController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view_dashboard')->only(['dashbaord']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $user->load(['roles', 'permissions']);
        return (new UserResource($user))->resolve();
        // return response()->json(

        //     ['id' => $user->id,
        //     'name' => $user->name,
        //     'email' => $user->email,

        //     // flattened, explicit
        //     'roles' => $user->roles->pluck('name'),

        //     // resolved, authoritative permissions
        //     'permissions' => $user->getAllPermissions()->pluck('name'),]
        // );
    }

    public function dashboard(Request $request)
    {
        $data = [];

        if ($request->user()->can('users.view')) {
            $data['users'] = User::count();
        }

        if ($request->user()->can('roles.view')) {
            $data['roles'] = Role::count();
        }

        return response()->json($data);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
