<?php
/**
 * Craft web bootstrap file
 */

// Load shared bootstrap
require __DIR__ . '/../../craft/reclaim-your-city/bootstrap.php';

// Load and run Craft
/** @var craft\web\Application $app */
$app = require CRAFT_VENDOR_PATH . '/craftcms/cms/bootstrap/web.php';
$app->run();
