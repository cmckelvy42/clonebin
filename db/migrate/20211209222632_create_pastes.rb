class CreatePastes < ActiveRecord::Migration[6.1]
  def change
    create_table :pastes do |t|
        t.text :content, null:false
        t.integer :user_id, null:false
        t.integer :privacy, null:false
        t.string :title, default:"Untitled"
        t.datetime :expiration_date 
        t.boolean :expired, default:false
        
      t.timestamps
    end
    add_index :pastes, :title
    add_index :pastes, :content
    add_index :pastes, :user_id
  end
end
