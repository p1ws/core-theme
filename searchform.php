<form role="search" method="get" id="searchform" class="searchform" action="<?php echo home_url( '/' ); ?>">
    <div class="searchform__wrap">
        <label for="s" class="screen-reader-text"><?php _e('Search for:','p1wscore'); ?></label>
        <input type="search" id="s" name="s" value="" placeholder="Search" />

        <button type="submit" id="searchsubmit" ><?php _e('Search','p1wscore'); ?></button>
    </div>
</form>