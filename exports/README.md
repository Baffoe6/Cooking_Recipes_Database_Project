# Exports

This folder contains database export files for the **Cooking Recipes Database Project**. These exports can be used for backup, sharing, or restoring the database.

## Files

### 1. **Sample Export**
- **File**: `sample_export.sql`
- **Description**: A SQL dump of the database with all tables, relationships, and sample data. This file can be used to quickly set up the database in a new environment.

## How to Use

### Importing the Database
1. Open your MySQL IDE (e.g., MySQL Workbench).
2. Connect to your MySQL server.
3. Use the following command to import the database:
   ```bash
   mysql -u [username] -p [database_name] < sample_export.sql