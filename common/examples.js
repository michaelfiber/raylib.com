$(document).ready(function() {

    // Init fancybox
    $('.fancybox').fancybox();

	function exampleEntry(difficulty, module, base) {
		return {difficulty, module, base, name: module + '_' + base }
	}

	function findExampleByName(examples, targetName) {
		for (var example of examples) {
			if (example.name == targetName) {
				return example
			}
		}
	}

	function findExampleIndexByName(examples, targetName) {
		return examples.findIndex(example => example.name == targetName)
	}

	function applyByFunctionFilter(searchString) {
		var filterText = searchString.toLowerCase()
		if (filterText === "") {
			$('#container').mixItUp('filter', exampleDivs);
			$('#matches_counter').hide();
			return
		}
		$('#matches_counter').show();

		// using a set to avoid duplicates
		const filteredExampleIndexes = new Set();

		for (var functionName in functionUsages) {
			if (!functionName.toLowerCase().includes(filterText)) continue;

			for (var usage of functionUsages[functionName]) {
				const exampleIndex = findExampleIndexByName(exampleData, usage);
				filteredExampleIndexes.add(exampleIndex);
			}
		}

		// check all functions and all tags for any match
		for (var functionName in examplesTags) {
			const matchingTags = examplesTags[functionName].filter(tagItem => tagItem.includes(filterText));
			if (matchingTags.length > 0) {
				const exampleIndex = findExampleIndexByName(exampleData, functionName);
				filteredExampleIndexes.add(exampleIndex);
			}
		}

		const filteredDivs = Array.from(filteredExampleIndexes).map(index => exampleDivs[index]);
		$('#container').mixItUp('filter', filteredDivs);
		$('#matches_counter').text(`Found ${filteredExampleIndexes.size} examples`);
	}

    var exampleData = [
        exampleEntry('⭐️☆☆☆' , 'core'    , 'basic_window'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'basic_screen_manager'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , '2d_camera'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , '2d_camera_mouse_zoom'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , '2d_camera_platformer'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'core'    , '2d_camera_split_screen'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , '3d_camera_first_person'),
        exampleEntry('⭐️☆☆☆' , 'core'    , '3d_camera_free'),
        exampleEntry('⭐️☆☆☆' , 'core'    , '3d_camera_mode'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , '3d_camera_split_screen'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , '3d_picking'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'automation_events'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'core'    , 'custom_frame_control'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'custom_logging'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , 'drop_files'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_gamepad'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_gamepad_info'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , 'input_gestures'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_keys'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_mouse'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_mouse_wheel'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'input_multitouch'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'loading_thread'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'random_values'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'scissor_test'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'smooth_pixelperfect'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , 'storage_values'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'vr_simulator'),
        exampleEntry('⭐️⭐️⭐️☆' , 'core'    , 'window_flags'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , 'window_letterbox'),
        exampleEntry('⭐️☆☆☆' , 'core'    , 'window_should_close'),
        exampleEntry('⭐️⭐️☆☆' , 'core'    , 'world_screen'),
        exampleEntry('⭐️☆☆☆' , 'shapes'  , 'basic_shapes'),
        exampleEntry('⭐️☆☆☆' , 'shapes'  , 'bouncing_ball'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'colors_palette'),
        exampleEntry('⭐️☆☆☆' , 'shapes'  , 'logo_raylib'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'logo_raylib_anim'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'rectangle_scaling'),
        exampleEntry('⭐️☆☆☆' , 'shapes'  , 'lines_bezier'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'collision_area'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'following_eyes'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'easings_ball_anim'),
        exampleEntry('⭐️⭐️☆☆' , 'shapes'  , 'easings_box_anim'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shapes'  , 'easings_rectangle_array'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shapes'  , 'draw_ring'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shapes'  , 'draw_circle_sector'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shapes'  , 'draw_rectangle_rounded'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shapes'  , 'splines_drawing'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shapes'  , 'top_down_lights'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'logo_raylib'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'srcrec_dstrec'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'image_drawing'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'image_generation'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'image_loading'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'image_processing'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'image_text'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'to_image'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'raw_data'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'particles_blending'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'npatch_drawing'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'background_scrolling'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'sprite_anim'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'sprite_button'),
        exampleEntry('⭐️⭐️☆☆' , 'textures', 'sprite_explosion'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'bunnymark'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'mouse_painting'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'blend_modes'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'draw_tiled'),
        exampleEntry('⭐️☆☆☆' , 'textures', 'polygon'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'fog_of_war'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'gif_player'),
        exampleEntry('⭐️⭐️⭐️☆' , 'textures', 'textured_curve'),
        exampleEntry('⭐️☆☆☆' , 'text'    , 'raylib_fonts'),
        exampleEntry('⭐️☆☆☆' , 'text'    , 'font_spritefont'),
        exampleEntry('⭐️⭐️☆☆' , 'text'    , 'font_filters'),
        exampleEntry('⭐️☆☆☆' , 'text'    , 'font_loading'),
        exampleEntry('⭐️⭐️⭐️☆' , 'text'    , 'font_sdf'),
        exampleEntry('⭐️☆☆☆' , 'text'    , 'format_text'),
        exampleEntry('⭐️⭐️☆☆' , 'text'    , 'input_box'),
        exampleEntry('⭐️⭐️☆☆' , 'text'    , 'writing_anim'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'text'    , 'rectangle_bounds'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'text'    , 'unicode'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'text'    , 'draw_3d'),
        exampleEntry('⭐️⭐️⭐️☆' , 'text'    , 'codepoints_loading'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'animation'),
        exampleEntry('⭐️⭐️⭐️☆' , 'models'  , 'billboard'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'box_collisions'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'cubicmap'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'first_person_maze'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'geometric_shapes'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'mesh_generation'),
        exampleEntry('⭐️⭐️⭐️☆' , 'models'  , 'mesh_picking'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'loading'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'loading_gltf'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'loading_vox'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'loading_m3d'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'orthographic_projection'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'models'  , 'rlgl_solar_system'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'yaw_pitch_roll'),
        exampleEntry('⭐️⭐️⭐️☆' , 'models'  , 'waving_cubes'),
        exampleEntry('⭐️☆☆☆' , 'models'  , 'heightmap'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'skybox'),
        exampleEntry('⭐️⭐️☆☆' , 'models'  , 'draw_cube_texture'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'basic_lighting'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'model_shader'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'shapes_textures'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'custom_uniform'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'postprocessing'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'palette_switch'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'raymarching'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'texture_drawing'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'texture_outline'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'texture_tiling'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'texture_waves'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'julia_set'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'eratosthenes'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'fog'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'simple_mask'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'hot_reloading'),
        exampleEntry('⭐️⭐️⭐️☆' , 'shaders' , 'lightmap'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'mesh_instancing'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'multi_sample2d'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'spotlight'),
        exampleEntry('⭐️⭐️☆☆' , 'shaders' , 'write_depth'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'hybrid_render'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'deferred_render'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'shaders' , 'basic_pbr'),
        exampleEntry('⭐️☆☆☆' , 'audio'   , 'module_playing'),
        exampleEntry('⭐️☆☆☆' , 'audio'   , 'music_stream'),
        exampleEntry('⭐️⭐️⭐️☆' , 'audio'   , 'raw_stream'),
        exampleEntry('⭐️☆☆☆' , 'audio'   , 'sound_loading'),
        exampleEntry('⭐️⭐️☆☆' , 'audio'   , 'sound_multi'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'audio'   , 'stream_effects'),
        exampleEntry('⭐️⭐️⭐️⭐️' , 'audio'   , 'mixed_processor')];

	var exampleDivs = []
    for (var i = 0; i < exampleData.length; i++) {
		var difficulty = exampleData[i].difficulty
        var module = exampleData[i].module;
        var name = exampleData[i].name;
        var description = exampleData[i].base.replaceAll('_', ' ');

		var previewImageURL = `https://raw.githubusercontent.com/raysan5/raylib/master/examples/${module}/${name}.png`
		var exampleLoaderURL = `examples/${module}/loader.html?name=${name}`;

        const exampleDiv = $(
            `<div class="mix f${module}">` +
                `<a class="fancybox fancybox.iframe" href="${exampleLoaderURL}" title="${description}">` +
                `<img width="400" height="225" src="${previewImageURL}"><div class="extext"><p>${description}</p></div></a>` +
                `<div id="difficulty_level">${difficulty}</div>` +
            '</div>')[0];

		exampleDivs.push(exampleDiv);

		$('#container').append(exampleDiv);
        $('#container a .extext').hide();
    }

	const filterFunctionInput = $('#filter_function input');

    var examplesTags = {};
    $.getJSON('examples/examples_tags.json', function(examplesTagsData) {
        // Filter out function usages of examples, which don't have a page
        for (var functionName in examplesTagsData) {
            if (findExampleByName(exampleData, functionName)) {
                examplesTags[functionName] = examplesTagsData[functionName];
            }
        }

        // do not handle input processing as we will pigyback (add to) the filterFunctionInput
    })
    .fail(function(jqXHR, textStatus, error) {
        const err = textStatus + ". " + error;
        console.error("Error loading examples_tags.json: " + err);
    });

	var functionUsages = {};
	$.getJSON('examples/function_usages.json', function(functionUsagesData) {
		// Filter out function usages of examples, which don't have a page
		for (var functionName in functionUsagesData) {
			functionUsages[functionName] = functionUsagesData[functionName].filter(usage => findExampleByName(exampleData, usage))
		}

		// While the JSON file was loaded, user could have entered text.
		// So apply filter, if it not empty
		if (filterFunctionInput !== '') {
			applyByFunctionFilter(filterFunctionInput.val())
		}

		// From now listen for input update events
		filterFunctionInput.on("input", function(event) {
			applyByFunctionFilter(event.target.value)
		});
	})
    .fail(function(jqXHR, textStatus, error) {
        const err = textStatus + ". " + error;
        console.error("Error loading function_usages.json: " + err);
    });

    // Instantiate MixItUp:
	$('#container').mixItUp();

    $('#container a').hover(
        function(){ $(this).find('.extext').show(); },
        function(){ $(this).find('.extext').hide(); });
/*
    $("#container a img").hover(
        function() { $(this).stop().animate({ opacity:0.6 }, 200, "easeOutQuad" ); },
        function() { $(this).stop().animate({ opacity:0 }, 200, "easeOutQuad" ); }
    )
*/
});
