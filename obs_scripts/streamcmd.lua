-- Copy from https://github.com/ntoff/obs_scripts/blob/master/streamcmd.lua

obs         = obslua
start_script_name = ""

function run_playwright()
	local liveKey = ''
	local tmpfile = '/tmp/bilibili-live-key.txt'
	os.execute(start_script_name..' > '..tmpfile)
	local f = io.open(tmpfile)
	for line in f:lines() do
		liveKey = line
	end
	f:close()
	return liveKey
end

function on_live_stream_event(event)
	if event == obs.OBS_FRONTEND_EVENT_STREAMING_STARTING then
		if start_script_name ~= "start_script" then
			obs.script_log(obs.LOG_INFO, "executing " .. start_script_name)
			local liveKey = run_playwright()
			obs.script_log(obs.LOG_INFO, "Got Bilibili live key: " .. liveKey)

    	local service = obs.obs_frontend_get_streaming_service()
    	local settings = obs.obs_service_get_settings(service)
    	obs.obs_data_set_string(settings, "key", liveKey)
    	obs.obs_service_update(service, settings)
    	obs.obs_data_release(settings)
    	obs.obs_frontend_save_streaming_service()
		end
	end
end

-----------------------------------------------------------------------------------------------------
--- plugin config
-----------------------------------------------------------------------------------------------------

function script_update(settings)
	start_script_name = obs.obs_data_get_string(settings, "start_script_name")
end

function script_description()
	return "run a script / executable when the live stream starts or ends"
end

function script_properties()
	props = obs.obs_properties_create()

	obs.obs_properties_add_path(props, "start_script_name", "Run", obs.OBS_PATH_FILE, "(*.sh);;(*.*)", NULL)
		
	return props
end

function script_defaults(settings)
	-- From http://lua-users.org/lists/lua-l/2020-01/msg00345.html
	local fullpath = debug.getinfo(1,"S").source:sub(2)
	fullpath = io.popen("realpath '"..fullpath.."'", 'r'):read('a')
	fullpath = fullpath:gsub('[\n\r]*$','')

	local dirname, filename = fullpath:match('^(.*/)([^/]-)$')
	dirname = dirname or ''
	filename = filename or fullpath

	obs.obs_data_set_default_string(
		settings,
		"start_script_name",
		dirname.."../run.sh"
	)
end

function script_load(settings)
	obs.obs_frontend_add_event_callback(on_live_stream_event)
end
