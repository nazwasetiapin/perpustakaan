<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;

class BorrowingController extends Controller
{
    // Menampilkan semua peminjaman
    public function index(Request $request)
    {
        $borrowings = Borrowing::with('user', 'book')
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('book', fn($q) =>
                    $q->where('title', 'like', '%' . $request->search . '%')
                );
            })
            ->paginate(10);

        return inertia('Borrowings/Index', [
            'borrowings' => $borrowings,
            'filters' => $request->only('search')
        ]);
    }

    // Menampilkan form create
    public function create()
    {
        $users = User::all();
        $books = Book::all();

        return inertia('Borrowings/Create', [
            'users' => $users,
            'books' => $books
        ]);
    }

    // Menyimpan peminjaman baru
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'borrowed_at' => 'required|date',
            'returned_at' => 'nullable|date|after:borrowed_at',
        ]);

        Borrowing::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'borrowed_at' => $request->borrowed_at,
            'returned_at' => $request->returned_at,
            'status' => 'borrowed',
        ]);

        return redirect()->route('borrowings.index')->with('success', 'Borrowing created successfully.');
    }

    // Menampilkan form edit (opsional)
    public function edit(Borrowing $borrowing)
    {
        // Mengambil relasi user dan book saat peminjaman
        $borrowing->load('user', 'book');
    
        return inertia('Borrowings/Edit', [
            'borrowing' => $borrowing,
            'users' => User::all(),
            'books' => Book::all(),
        ]);
    }
    

    // Update data
    public function update(Request $request, Borrowing $borrowing)
    {
        $request->validate([
            'returned_at' => 'nullable|date',
            'status' => 'required|in:borrowed,returned'
        ]);

        $borrowing->update($request->only('returned_at', 'status'));

        return redirect()->route('borrowings.index')->with('success', 'Borrowing updated.');
    }

    // Menghapus data
    public function destroy(Borrowing $borrowing)
    {
        $borrowing->delete();
        return redirect()->route('borrowings.index')->with('success', 'Borrowing deleted.');
    }
}
