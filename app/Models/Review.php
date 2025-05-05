<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    // Kolom yang bisa diisi
    protected $fillable = [
        'user_id', 'book_id', 'rating', 'comment',
    ];

    // Relasi ke tabel User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke tabel Book
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
