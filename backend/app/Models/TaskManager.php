<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskManager extends Model
{
        protected $table = 'task';

    protected $fillable = ['title', 'description', 'status'];
}
