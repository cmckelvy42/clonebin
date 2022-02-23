class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, null:false
      t.string :email, null:false
      t.string :password_digest, null:false
      t.string :session_token
      t.string :keyword_1
      t.string :keyword_2
      t.string :keyword_3
      t.string :picture_url, null:false

      t.timestamps
    end
    add_index :users, :name, unique:true
    add_index :users, :email, unique:true
    add_index :users, :session_token, unique:true
  end
end