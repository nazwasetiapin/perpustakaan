<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use App\Models\Post;

class PostController extends Controller implements HasMiddleware
{
    /**
     * Define middleware untuk mengatur hak akses tiap metode.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:posts index', only: ['index']),
            new Middleware('permission:posts create', only: ['create', 'store']),
            new Middleware('permission:posts edit', only: ['edit', 'update']),
            new Middleware('permission:posts delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the posts.
     */
    public function index(Request $request)
    {
        $posts = Post::query()
            ->when($request->search, function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->search . '%')
                      ->orWhere('body', 'like', '%' . $request->search . '%');
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Posts/Index', [
            'posts'   => $posts,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create()
    {
        return Inertia::render('Posts/Create');
    }

    /**
     * Store a newly created post in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:255',
            'body'  => 'required|min:3',
        ]);

        Post::create([
            'title' => $request->title,
            'body'  => $request->body,
        ]);

        return to_route('posts.index')->with('success', 'Post created successfully.');
    }

    /**
     * Show the form for editing the specified post.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified post in storage.
     */
    public function update(Request $request, Post $post)
    {
        $request->validate([
            'title' => 'required|min:3|max:255',
            'body'  => 'required|min:3',
        ]);

        $post->update([
            'title' => $request->title,
            'body'  => $request->body,
        ]);

        return to_route('posts.index')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified post from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return back()->with('success', 'Post deleted successfully.');
    }
}
