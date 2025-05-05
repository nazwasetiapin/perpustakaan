<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'author', 'publisher', 'year',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_category');
    }

    public function collections()
{
    return $this->hasMany(Collection::class);
}

// app/Models/Book.php

public function reviews()
{
    return $this->hasMany(Review::class);
}


}
