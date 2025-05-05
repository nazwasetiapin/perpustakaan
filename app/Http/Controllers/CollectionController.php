<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class CollectionController extends Controller implements HasMiddleware
{
    /**
     * Middleware untuk otorisasi (gunakan jika pakai spatie permission)
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:collections index', only: ['index']),
            new Middleware('permission:collections create', only: ['create', 'store']),
            new Middleware('permission:collections edit', only: ['edit', 'update']),
            new Middleware('permission:collections delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $collections = Collection::with(['user', 'book'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Collections/Index', [
            'collections' => $collections,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Collections/Create', [
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ]);

        Collection::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
        ]);

        return to_route('collections.index')->with('success', 'Koleksi berhasil ditambahkan.');
    }

    public function edit(Collection $collection)
    {
        return Inertia::render('Collections/Edit', [
            'collection' => $collection,
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    public function update(Request $request, Collection $collection)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
        ]);

        $collection->update([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
        ]);

        return to_route('collections.index')->with('success', 'Koleksi berhasil diperbarui.');
    }

    public function destroy(Collection $collection)
    {
        $collection->delete();

        return to_route('collections.index')->with('success', 'Koleksi berhasil dihapus.');
    }
}
