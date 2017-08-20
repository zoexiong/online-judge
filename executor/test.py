import docker
from docker.errors import *
import uuid
import os
import shutil # bash util

# IMAGE_NAME = "justkzoe/coj_executor"

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TEMP_BUILD_DIR = "%s/tmp" % CURRENT_DIR

SOURCE_FILE_NAMES = {
    "java" : "Example.java",
    'python' : 'example.py'
}

BINARY_NAMES = {
    "java" : "Example",
    'python' : 'example.py'
}

BUILD_COMMANDS = {
    "java" : "javac",
    "python" : "python"
}

# actually python files will be executed for twice since the build and execute commands are the same
EXECUTE_COMMANDS = {
    "java" : "java",
    "python" : "python"
}


# client = docker.from_env()

# def load_image():
#     try:
#         client.images.get(IMAGE_NAME)
#         # need to import errors to use ImageNotFound
#     except ImageNotFound:
#         print("Image nuot found locally, Loading from Dockerhub...")
#         client.images.pull(IMAGE_NAME)
#         # if not able to connect to docker engine
#     except APIError:
#         print("Image not found locally. Dockerhub is not accessible.")
#         return
#     print("Image:[%s] loaded" % IMAGE_NAME)


def make_dir(dir):
    try:
        os.mkdir(dir)
        print("Temp build directory [%s] created." % dir)
    except OSError:
        print("Temp build directory [%s] exists." % dir)

def build_and_run(code, lang):

    # File sys operations
    result = { 'build': None, 'run': None, 'error': None }
    # generate unique id for folders of different users and services
    source_file_parent_dir_name = uuid.uuid4()
    # on local sys (map from)
    source_file_host_dir = "%s/%s" % (TEMP_BUILD_DIR, source_file_parent_dir_name)
    # in container (map to)
    source_file_guest_dir = "/test/%s" % source_file_parent_dir_name
    make_dir(source_file_host_dir)

    # add source code to local sys (w means write)
    with open('%s/%s' % (source_file_host_dir, SOURCE_FILE_NAMES[lang]), 'w') as source_file:
        source_file.write(code)

    # try:
    #     client.containers.run(
    #         # no space around = when passing parameters as a convention
    #         image=IMAGE_NAME,
    #         command="%s %s" % (BUILD_COMMANDS[lang], SOURCE_FILE_NAMES[lang]),
    #                 # read and write
    #         volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode':'rw'}},
    #                 # indicate the working directory to avoid use absolute path
    #         working_dir=source_file_guest_dir
    #     )
    #     print ("Source built")
    #     result['build'] = 'OK'

    # except ContainerError as e:
    #     print("Build failed.")
    #     result['build'] = e.stderr
    #     # remove dir
    #     shutil.rmtree(source_file_host_dir)
    #     return result

    # try:
    #     # no need to refactor this since it's only one line
    #     log = client.containers.run(
    #         image=IMAGE_NAME,
    #         # after compilation, we need to use binary name to access the file
    #         command="%s %s" % (EXECUTE_COMMANDS[lang], BINARY_NAMES[lang]),
    #         volumes={source_file_host_dir: {'bind': source_file_guest_dir, 'mode': 'rw'}},
    #         working_dir=source_file_guest_dir)
    #     print("Executed.")
    #     result['run'] = log
    # except ContainerError as e:
    #     print("Execution failed.")
    #     result['run'] = e.stderr
    #     shutil.rmtree(source_file_host_dir)
    #     return result

    # shutil.rmtree(source_file_host_dir)
    # return result

build_and_run("print 12345+1", "python")





