# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
##usersテーブル
 
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
 
**Association**
 -has_many :groups, through :group_users
 -has_many :messages
 -has_many :group_users
  
#massageテーブル
  
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
|comment|text|null: false|
|image|string|null: false|

**Association**
-belong_to :user
-belong_to :group

#groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|

**Association**
-has_many :users, through :group_users
-has_many :messages
-has_many :group_users

#group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

**Association**
-belong_to :user
-belong_to :message
