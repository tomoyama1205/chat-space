## usersテーブル
 
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true, unique: true|
 
### Association
 -has_many :messages
 -has_many :group_users
 -has_many :groups, through :group_users
  
## massageテーブル
  
|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|
|comment|text|null: false|
|image|string|null: false|

### Association
-belongs_to :user
-belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: false, unique: true|

### Association
-has_many :group_users
-has_many :messages
-has_many :users, through :group_users

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|reference|null: false, foreign_key: true|
|group|reference|null: false, foreign_key: true|

### Association
-belongs_to :user
-belongs_to :group


