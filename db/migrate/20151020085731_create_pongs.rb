class CreatePongs < ActiveRecord::Migration
  def change
    create_table :pongs do |t|

      t.timestamps null: false
    end
  end
end
