<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class Utils
{
    /**
     * Check if the database connection is established.
     */
    public static function isDBConnected(): bool
    {
        try {
            DB::connection()->getPdo();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public static function featureLimit($item, $count)
    {
        $user = app('user');

        if (Role::isAdmin()) {
            return [true, ''];
        };

        $limit = $user->pricing_plan->pricing_features[$item];

        if ($limit != 'Unlimited') {
            if ((int) $limit <= $count) {
                $message = ucfirst($item) . ' creation limit over now. Please update your current plan to get more limit.';

                return [false, $message];
            };
        }

        return [true, ''];
    }

    public static function exportToCSV($dataList, array $columns, string $filename)
    {
        $csvFileName = $filename . time() . '.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=$csvFileName",
            'Filename' => $csvFileName,
        ];

        $output = fopen('php://output', 'w');
        fputcsv($output, $columns);

        foreach ($dataList as $data) {
            $row = [];
            foreach ($columns as $column) {
                $row[] = $data->{$column};
            }
            fputcsv($output, $row);
        }

        fclose($output);

        return $headers;
    }

    public static function getFileArray($content)
    {
        $newContent = str_replace('array (', '[', var_export($content, true));
        $newContent = str_replace(')', ']', $newContent);

        foreach ($content as $key => $elements) {
            $newContent = str_replace("$key =>", "", $newContent);
        }

        $newContent = preg_replace('/\n\s*(?=\[)/', "", $newContent);

        return "<?php\n\nreturn " . $newContent . ';';
    }

    public static function changeEnv($data = array())
    {
        if (count($data) > 0) {

            // Read .env-file
            $env = file_get_contents(base_path() . '/.env');

            // Split string on every " " and write into array
            $env = preg_split('/(\r\n|\n|\r)/', $env);

            // Loop through given data
            foreach ((array) $data as $key => $value) {

                // Loop through .env-data
                foreach ($env as $env_key => $env_value) {

                    // Turn the value into an array and stop after the first split
                    $entry = explode("=", $env_value, 2);

                    // Check, if new key fits the actual .env-key
                    if ($entry[0] == $key) {
                        // If yes, overwrite it with the new one
                        if ($value !== null) {

                            $env[$env_key] = $key . "=" . $value;
                        }
                    } else {
                        // If not, keep the old one
                        $env[$env_key] = $env_value;
                    }
                }
            }

            // Turn the array back to an String
            $env = implode("\n", $env);

            // And overwrite the .env with the new data
            file_put_contents(base_path() . '/.env', $env);

            return true;
        } else {
            return false;
        }
    }
}
