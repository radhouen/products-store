
### Export Data about Gityub Repo: 

```sh
$ export GHUSER="<YOUR_GITHUB_USER>"
$ export GHREPO="<YOUR_GITHUB_REPO>"
```

#### Example:



```sh
$ export GHUSER="radhouen"
$ export GHREPO="products-store"
```

### Apply Fluxcd deployment:


```sh
$ kubectl create ns flux
namespace/flux created
$ fluxctl install \
--git-user=${GHUSER} \
--git-email=${GHUSER}@users.noreply.github.com \
--git-url=git@github.com:${GHUSER}/${GHREPO} \
--git-path=namespaces,workloads \
--namespace=flux | kubectl apply -f -
```


#### Example:

```sh
$ kubectl create ns flux
namespace/flux created
$ fluxctl install \
--git-user=${GHUSER} \
--git-email=${GHUSER}@users.noreply.github.com \
--git-url=git@github.com:${GHUSER}/${GHREPO} \
--git-path=fluxcd/namespaces,fluxcd/workloads \
--namespace=flux | kubectl apply -f -
```

The fluxctl install command generates the required Kubernetes manifests according to the following options:

- git-user — The Git user. In this case, the GitHub username
- git-email — The Git user email. In this case, the default GitHub email
- git-url — The URL of the Git repository
- git-path — The directories within the Git repository to sync changes from
- namespace — The namespace to deploy the flux operator


### Apply For the Node Application: