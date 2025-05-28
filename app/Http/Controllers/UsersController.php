<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Services\UsersService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UsersController extends Controller
{
    protected UsersService $usersService;

    public function __construct()
    {
        $this->usersService = new UsersService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $users = $this->usersService->getUsers($request->all());

        return Inertia::render('Dashboard/Admin/Users/Index', compact('users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $this->usersService->updateUser($id, $request->validated());

        return back()->with('success', 'User account status successfully changed');
    }
}
