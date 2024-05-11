
# OpenTelemetry Auto-Instrumenation with Opentelemetry Kubernetes Operator

## Prerequisites
- Kubernetes Cluster kubeconfig
- Kubectl version >= v1.19.0. (otherwise, you'll have issues updating the CRDs)
- git
- curl

## Local Environment Setup

- [Git](https://git-scm.com/)
- [Node.js v18.16.0](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/engine/install/)
- [Kubernetes](https://kubernetes.io/docs/setup/)
- [Ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/)
- [Skaffold](https://skaffold.dev/docs/install/)
- [Visual Studio Code](https://code.visualstudio.com/)


## 1. Install Cert-manager
All resources (the CustomResourceDefinitions and the cert-manager, cainjector and webhook components) are included in a single YAML manifest file:

Install all cert-manager components:

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.5/cert-manager.yaml
```

By default, cert-manager will be installed into the cert-manager namespace. It is possible to run cert-manager in a different namespace, although you'll need to make modifications to the deployment manifests.

Once you've installed cert-manager, you can verify it is deployed correctly by checking the cert-manager namespace for running pods:

```bash
$ kubectl get pods --namespace cert-manager

NAME                                       READY   STATUS    RESTARTS   AGE
cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m
```

You should see the cert-manager, cert-manager-cainjector, and cert-manager-webhook pods in a Running state. The webhook might take a little longer to successfully provision than the others.

## 2. Install Open-Telemetry Operator

To install the operator in an existing cluster, make sure you have cert-manager installed and run:

```bash
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

## 3. Instrument the application


Install skaffold

```
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
```

Run the following command to clone the application repository

```bash
git clone https://github.com/samin-irtiza/KCD2024-Project

cd KCD2024-Project/
```


## Run Locally

### 1. Environment Variables for Local Development

Check the .env.example file and set the secret following the below command.

```
$ kubectl create secret generic <SECRET_NAME> --from-literal <SECRET_KEY>=<SECRET_VALUE>
# example: kubectl create secret generic jwt-secret --from-literal JWT_KEY=asdf
```

### 2. Clone repo

```
$ skaffold dev
```
