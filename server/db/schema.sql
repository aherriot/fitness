create extension if not exists "uuid-ossp";

create table users (
    id uuid primary key default uuid_generate_v4(),
    username varchar(20) unique not null,
    password varchar(256) not null,
    created_at timestamp not null default now(),
    updated_at timestamp
);

create type weight_unit as enum('KILOGRAM', 'POUND', 'STONE');

create table user_preferences (
    user_id uuid references users unique not null,
    weight_unit weight_unit not null
);

create table measurements (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users not null,
    weight numeric,
    created_at timestamp not null default now()
);