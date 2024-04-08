class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t|
      t.datetime :timestamp
      t.decimal :value, precision: 10, scale: 2
      t.string :name

      t.timestamps
    end
    add_index :metrics, %i[timestamp name]
  end
end
