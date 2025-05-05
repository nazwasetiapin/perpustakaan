<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // Kolom ID untuk primary key
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key untuk user_id
            $table->foreignId('book_id')->constrained()->onDelete('cascade'); // Foreign key untuk book_id
            $table->integer('rating'); // Kolom untuk rating (1-5)
            $table->text('comment'); // Kolom untuk komentar
            $table->timestamps(); // Kolom created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}
