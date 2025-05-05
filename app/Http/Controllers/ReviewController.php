<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    // Menampilkan daftar review
    public function index(Request $request)
    {
        // Ambil data review, dengan relasi ke user dan book
        $reviews = Review::with('user', 'book')
            ->when($request->search, function ($query) use ($request) {
                $query->where('comment', 'like', '%' . $request->search . '%');
            })
            ->paginate(10);

        return inertia('Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only(['search']),
        ]);
    }

    // Menampilkan form untuk menambahkan review
    public function create()
    {
        $users = User::all();
        $books = Book::all();

        return inertia('Reviews/Create', [
            'users' => $users,
            'books' => $books
        ]);
    }

    // Menyimpan review yang baru
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:255',
        ]);

        // Menyimpan review
        Review::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->route('reviews.index')->with('success', 'Review added successfully');
    }

    // Menampilkan form untuk mengedit review
    public function edit(Review $review)
    {
        $users = User::all();
        $books = Book::all();

        return inertia('Reviews/Edit', [
            'review' => $review,
            'users' => $users,
            'books' => $books
        ]);
    }

    // Memperbarui review
    public function update(Request $request, Review $review)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:255',
        ]);

        $review->update([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return redirect()->route('reviews.index')->with('success', 'Review updated successfully');
    }

    // Menghapus review
    public function destroy(Review $review)
    {
        $review->delete();

        return redirect()->route('reviews.index')->with('success', 'Review deleted successfully');
    }
}
