<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use App\Models\Book;

class BookController extends Controller implements HasMiddleware
{
    /**
     * Define middleware untuk mengatur hak akses tiap metode.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:books index', only: ['index']),
            new Middleware('permission:books create', only: ['create', 'store']),
            new Middleware('permission:books edit', only: ['edit', 'update']),
            new Middleware('permission:books delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the books.
     */
    public function index(Request $request)
{
    $books = Book::query()
        ->when($request->search, function ($query) use ($request) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('author', 'like', '%' . $request->search . '%')
                ->orWhere('publisher', 'like', '%' . $request->search . '%')
                ->orWhere('year', 'like', '%' . $request->search . '%');
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

    return Inertia::render('Books/Index', [
        'books'   => $books, 
        'filters' => $request->only(['search']),
    ]);
}


    /**
     * Show the form for creating a new book.
     */
    public function create()
    {
        return Inertia::render('Books/Create');
    }

    /**
     * Store a newly created book in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:3|max:255',
            'author' => 'required|min:3|max:255',
            'publisher' => 'required|min:3|max:255',
            'year' => 'required|integer|min:1900|max:2025',
        ]);

        Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'publisher' => $request->publisher,
            'year' => $request->year,
        ]);

        return to_route('books.index')->with('success', 'Book created successfully.');
    }

    /**
     * Show the form for editing the specified book.
     */
    public function edit(Book $book)
    {
        return Inertia::render('Books/Edit', [
            'book' => $book,
        ]);
    }

    /**
     * Update the specified book in storage.
     */
    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title' => 'required|min:3|max:255',
            'author' => 'required|min:3|max:255',
            'publisher' => 'required|min:3|max:255',
            'year' => 'required|integer|min:1900|max:2025',
        ]);

        $book->update([
            'title' => $request->title,
            'author' => $request->author,
            'publisher' => $request->publisher,
            'year' => $request->year,
        ]);

        return to_route('books.index')->with('success', 'Book updated successfully.');
    }
    

    /**
     * Remove the specified book from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();

        return back()->with('success', 'Book deleted successfully.');
    }
}
