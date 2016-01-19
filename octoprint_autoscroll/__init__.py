# coding=utf-8
import octoprint.plugin
import logging

class AutoscrollPlugin(octoprint.plugin.AssetPlugin):

	def get_assets(self):
		return dict(
				js=["js/autoscroll.js"]
			)
			
	def get_version(self):
		return self._plugin_version

	def get_update_information(self):
		return dict(
			autoscroll=dict(
				displayName="Autoscroll",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="MoonshineSG",
				repo="OctoPrint-Autoscroll",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/MoonshineSG/OctoPrint-Autoscroll/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "Autoscroll"


def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = AutoscrollPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}


