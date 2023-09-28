export default function customUserProfile({params}){
    return <h1 className="text-4xl">Welcome to your profile, user {params.id}!</h1>
}