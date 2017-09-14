# Rule for running Webpack under Bazel

def _webpack_bundle_impl(ctx):
  # print("_webpack_bundle_impl %s" % ctx.label)
  # print("ctx.bin_dir %s" % ctx.bin_dir)
  # print("ctx.bin_dir.path %s" % ctx.bin_dir.path)
  # print("ctx.label.workspace_root %s" % ctx.label.workspace_root)
  # print("ctx.label.package %s" % ctx.label.package)
  # print("ctx.build_file_path %s" % ctx.build_file_path)
  # print("ctx.genfiles_dir %s" % ctx.genfiles_dir)
  # print("ctx.configuration %s" % ctx.configuration)
  # print("ctx.outputs.webpack_config %s" % ctx.outputs.webpack_config.path)

  root_dir = str(ctx.bin_dir)[:-len('[derived]')]
  package_dir = '/'.join([root_dir, ctx.label.package])
  entry_point = '/'.join([package_dir, ctx.attr.entry_point])

  # print("root_dir %s" % root_dir)
  # print("package_dir %s" % package_dir)
  # print("entry_point %s" % entry_point)

  ctx.template_action(
      template=ctx.file._webpack_config_template,
      output=ctx.outputs.webpack_config,
      substitutions={
          "TEMPLATED_target": ctx.attr.target,
          "TEMPLATED_root_dir": root_dir,
          "TEMPLATED_entry_point": entry_point,
          "TEMPLATED_name": ctx.attr.name,
          "TEMPLATED_output": ctx.outputs.bundle.path
      },
  )

  args = ["--config", ctx.outputs.webpack_config.path]
  args += ["--progress"]
  ctx.action(
      progress_message = "Webpack bundling %s" % ctx.attr.entry_point,
      outputs = [ctx.outputs.bundle],
      executable = ctx.executable._webpack,
      arguments = args,
  )

  return struct()

webpack_bundle = rule(
    implementation = _webpack_bundle_impl,
    attrs = {
        "entry_point": attr.string(mandatory=True),
        "target": attr.string(mandatory=True),
        "_webpack": attr.label(
          default=Label("//internal/webpack:webpack"),
          executable=True,
          cfg="host"),
        "_webpack_config_template": attr.label(
            default = Label("//internal:webpack.config.js"),
            allow_files = True,
            single_file = True),
    },
    outputs = {
        "bundle": "%{name}.js",
        "webpack_config": "%{name}_webpack.config.js"
    })
