
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
Provide the name of your GitHub user within the GHUSER environment variable and the GitHub repo within the GHREPO environment variable, as shown below. Create a new namespace called flux and install the Flux CD operator in the Kubernetes cluster.

The fluxctl install command generates the required Kubernetes manifests according to the following options:

- git-user — The Git user. In this case, the GitHub username
- git-email — The Git user email. In this case, the default GitHub email
- git-url — The URL of the Git repository
- git-path — The directories within the Git repository to sync changes from
- namespace — The namespace to deploy the flux operator

### Demo : 

- Check if Flux deployment is successful:

![plot](./screens/flux-pods.png)

- Get All resources from the Flux namespace:

Let’s get all resources within the flux namespace to see the current state of the objects.

As you see, there is a flux pod and a memcached pod. There is also a memcached service as the flux pod needs to interact with it.

![plot](./screens/get-all-flux.png)

- Authorise Flux CD to Connect to Your Git Repository

We now need to allow the Flux CD operator to interact with the Git repository, and therefore, we need to add its public SSH key to the repo.

Get the public SSH key using fluxctl.

![plot](./screens/generate-flux-key.png)

Add the SSH key to your repository so that Flux CD can access it.

    Go to https://github.com/<YOUR_GITHUB_USER>/nginx-kubernetes/settings/keys
    Add a name to the Key in the Title section.
    Paste the SSH Key in the Key section.
    Check “Allow write access.”


![plot](./screens/add-flux-key.png)


- Flux CD synchronises automatically with the configured Git repository every five minutes. However, if you want to synchronise Flux with the Git repo immediately, you can use fluxctl sync, as below.

![plot](./screens/flux-sync.png)

- Now let’s get the pods to see if we have two replicas of nginx

![plot](./screens/flux.png)



![plot](./screens/get-all-object-in-web-ns.png)



### Apply For the Node Application:

just change this steps by replacing the git path and all be the same,

```sh
```sh
$ kubectl create ns flux
namespace/flux created
$ fluxctl install \
--git-user=${GHUSER} \
--git-email=${GHUSER}@users.noreply.github.com \
--git-url=git@github.com:${GHUSER}/${GHREPO} \
--git-path=deploy \
--namespace=flux | kubectl apply -f -
```

- Apply Fluxctl for my deploy folder :


![plot](./screens/demo/myapp.png)


- Check the flux namespace components:

![plot](./screens/demo/get-all-flux.png)

- We use flux that use the pull GitOps request , when I pushed a new file to create the namespace products-store , fluxcd check the repos periodcally and when detect a change he will apply the desired state , in our case he will create a new namespace after the commit this namespace called products-store.


![plot](./screens/demo/ns-created.png)

- After make any chnage on the files inside the deploy folder that have the anotaion automated true will be synchronized automatically :


![plot](./screens/demo/new-service-deployed.png)



### Monitoring:

#### Create a namespace called monitoring

* First of all pull the helm chart for prometheus and grafana
* Install it on a namespace called monitoring .

![plot](./screens/monitoring/monitoring.png)

#### Check the po/svc created on the namespace monitoring


![plot](./screens/monitoring/monitoring1.png)

#### Update the svc for prometheus from clusterIP to nodePort


![plot](./screens/monitoring/monitoring3.png)

#### Check prometheus


![plot](./screens/monitoring/monitoring2.png)


#### Make the same thing for grafana 
- change svc from clusterIp to nodePort


![plot](./screens/monitoring/monitoring4.png)

#### Open Grafana dashboard

- Import the cluster json (fluxcd/kubernetes-cluster-prometheus_rev1.json) .
![plot](./screens/monitoring/monitoring5.png)